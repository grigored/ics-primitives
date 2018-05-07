import {Linking, NativeModules} from 'react-native';
// import PermissionsComponent from "react-native-permissions";
import {isAndroid, isIOS} from '../../primitives/platform/platform';


export async function checkForCameraPermission(permissionType, showAlert) {

    const {Permissions} = Expo;

    let check, request, requestResponse, message;
    if (permissionType === 'camera') {
        check = () => checkPermission(Permissions.CAMERA);
        request = () => requestPermission(Permissions.CAMERA);
        // check = () => PermissionsComponent.check('camera');
        // request = () => PermissionsComponent.request('camera');
        message = 'PERMISSION_DENIED_CAMERA';
    }
    else if (permissionType === 'album') {
        check = () => checkPermission(Permissions.CAMERA);
        request = () => requestPermission(Permissions.CAMERA);
        // expo does not support camera roll yet
        // check = () => checkPermission(Permissions.CAMERA_ROLL);
        // request = () => requestPermission(Permissions.CAMERA_ROLL);
        // check = () => PermissionsComponent.check('photo');
        // request = () => PermissionsComponent.request('photo');
        message = 'PERMISSION_DENIED_ALBUM';
    }
    else {
        throw 'Unknown permission type';
    }
    const result = await check();

    // see https://github.com/yonahforst/react-native-permissions for result values and meaning
    if (result === 'authorized') {
        return true;
    }

    // native dialogs for permission will be visible
    if (result === 'undetermined' || (result === 'denied' && isAndroid)) {
        requestResponse = await request();
        return requestResponse === 'authorized';
    }

    // native dialogs for permission will not be visible anymore, prompt user to settings
    showAlert(message);
    return false;
}

export function goToSettings(props) {

    if (isIOS) {
        Linking.canOpenURL('app-settings:').then(supported => {
            if (!supported) {
                props.showAlert('CANT_OPEN_SETTINGS');
                // console.log('Can\'t handle settings url');
            } else {
                // this.props.popScreen();
                setTimeout(() => Linking.openURL('app-settings:'), 350);
                {/*return Linking.openURL('app-settings:');*/
                }
            }
        }).catch(err => {
            props.showAlert('CANT_OPEN_SETTINGS');
            console.log(err);
        });
    }
    else {
        props.popScreen();
        NativeModules.NativeConfigs.openPermissions();
    }
}

async function checkPermission(permission) {
    const {Permissions} = Expo;
    const {status} = await Permissions.getAsync(permission);
    if (status === 'granted') {
        // return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    }
    return status
}

async function requestPermission(permission) {
    const {Permissions} = Expo;
    const {status} = await Permissions.askAsync(permission);
    if (status === 'granted') {
        // return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    }
    return status
}