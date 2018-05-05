/**
 * Created by alexbuicescu on 22 - Aug 2017.
 * Source: https://gist.github.com/pvanliefland/8c2522a27daf4759b015e3345ba47dda
 * GitHub issue: https://github.com/lwansbrough/react-native-camera/issues/224
 */
import React from 'react';
import PropTypes from 'prop-types';
import {AppState, Linking, PermissionsAndroid, Platform} from 'react-native';
import RNCamera from 'react-native-camera';
import {_t} from "../../utils/i18n";
import {CAMERA_PERMISSION_IS_DENIED, PHOTO_PERMISSION_IS_DENIED} from "../../utils/strings";
import {Button} from "../../nativeComponents/Button/Button";
import {Text} from "../Text/Text";
import {View} from "../View/View";
import {goToSettings} from "./utils";

/**
 * Overridden Camera module
 *
 * 3 goals:
 * - handle Android permissions (https://github.com/lwansbrough/react-native-camera/issues/224 as well as
 *   https://github.com/lwansbrough/react-native-camera/issues/671)
 * - fix https://github.com/lwansbrough/react-native-camera/issues/604
 * - add a "onPermissions" callback informing the parent element of permissions state
 *
 * Additional props:
 * - onPermissions: called with true or false
 */
class CCamera extends RNCamera {

    static alertsData = (props) => ({
        [DIALOG_IDS.PERMISSION_DENIED_CAMERA]: {
            body: CAMERA_PERMISSION_IS_DENIED,
            cancelButton: {},
            okButton: {
                onPress: () => {
                    goToSettings(props);
                }
            }
        },
        [DIALOG_IDS.PERMISSION_DENIED_ALBUM]: {
            body: PHOTO_PERMISSION_IS_DENIED,
            cancelButton: {},
            okButton: {
                onPress: () => {
                    goToSettings(props);
                }
            }
        },
    });

    // react-native-camera does not handle the new Android permissions system, so we overrides the static checkXYZ()
    // functions (see implementation below)
    static checkDeviceAuthorizationStatus = Platform.OS === 'ios' ?
        RNCamera.checkDeviceAuthorizationStatus :
        checkDeviceAuthorizationStatusAndroid;

    static checkVideoAuthorizationStatus = Platform.OS === 'ios' ?
        RNCamera.checkVideoAuthorizationStatus :
        checkVideoAuthorizationStatusAndroid;

    static checkAudioAuthorizationStatus = Platform.OS === 'ios' ?
        RNCamera.checkAudioAuthorizationStatus :
        checkAudioAuthorizationStatusAndroid;

    // _handleAppStateChange = (nextAppState) => {
    //     if (this.state.appState && this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    //         console.log('App has come to the foreground!');
    //         this.componentWillMount();
    //     }
    //     this.setState({appState: nextAppState});
    // };
    //
    // constructor(props) {
    //     super(props);
    //     if (!this.state) {
    //         this.state = {};
    //     }
    //     this.state.appState = AppState.currentState;
    // }
    //
    // componentDidMount() {
    //     super.componentDidMount();
    //     AppState.addEventListener('change', this._handleAppStateChange);
    // }
    //
    // componentWillUnmount() {
    //     super.componentWillUnmount();
    //     AppState.removeEventListener('change', this._handleAppStateChange);
    // }
    /**
     * Overrides react-native camera Camera.componentWillMount
     *
     */
    async componentWillMount() {
        this._addOnBarCodeReadListener();

        const captureMode = typeof this.props.captureMode === 'string' ?
            RNCamera.constants.CaptureMode[this.props.captureMode] :
            this.props.captureMode;

        const hasVideoAndAudio = this.props.captureAudio && captureMode === RNCamera.constants.CaptureMode.video;
        const check = hasVideoAndAudio ? Camera.checkDeviceAuthorizationStatus : Camera.checkVideoAuthorizationStatus;

        if (check) {
            const isAuthorized = await check();

            if (isAuthorized) {
                this.props.onPermissions(true);
                this.setState({isAuthorized});
            }
            else if (Platform.OS === 'android') {
                const permissionSet = hasVideoAndAudio ?
                    [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] :
                    [PermissionsAndroid.PERMISSIONS.CAMERA];

                PermissionsAndroid
                    .requestMultiple(permissionSet)
                    .then(results => {
                        const denied = Object.values(results).some(value => value !== 'granted');
                        this.setState({isAuthorized: !denied});
                        this.props.onPermissions(!denied);
                    })
                    .done();
            }
            else { // iOS
                this.props.onPermissions(false);
                this.setState({isAuthorized});
            }
        }
    }

    /**
     * Override render - we want to avoid rendering the component itself before getting permissions info for 2 reasons:
     * - https://github.com/lwansbrough/react-native-camera/issues/604
     * - on Android, if directly rendering the component, it doesn't get refreshed just after granting the permissions
     *
     * @returns {XML}
     */
    render() {
        return this.state.isAuthorized ? super.render() :
            <View style={[
                // this.props.style,
                {
                    alignItems: 'center',
                    width: '100%',
                }
            ]}>
                <Text>{_t(CAMERA_PERMISSION_IS_DENIED)}</Text>
                <Button
                    raised={true}
                    color={"primary"}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 16,
                        paddingBottom: 16,
                        width: '80%',
                        marginTop: 16,
                    }}
                    labelStyle={{
                        flex: 1
                    }}
                    title={'Go to settings'}
                    onPress={() => {
                        goToSettings(this.props);
                    }}
                />
            </View>
    }
}

export const Camera = displayAlerts("Camera", CCamera);


Camera.propTypes = {
    ...RNCamera.propTypes, ...{
        onPermissions: PropTypes.func
    }
};
Camera.defaultProps = {
    ...RNCamera.defaultProps, ...{
        onPermissions: () => {
        }
    }
};

function checkAuthorizationStatusAndroid(permissionSet) {
    const androidPermissionPromises = permissionSet.map(PermissionsAndroid.check);

    return new Promise((resolve, reject) => {
        Promise
            .all(androidPermissionPromises)
            .then(results => {
                resolve(results.indexOf(false) === -1);
            })
            .catch(reject)
            .done();
    });
}

function checkDeviceAuthorizationStatusAndroid() {
    return checkAuthorizationStatusAndroid([
        PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ]);
}

function checkVideoAuthorizationStatusAndroid() {
    return checkAuthorizationStatusAndroid([PermissionsAndroid.PERMISSIONS.CAMERA]);
}

function checkAudioAuthorizationStatusAndroid() {
    return checkAuthorizationStatusAndroid([PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]);
}
