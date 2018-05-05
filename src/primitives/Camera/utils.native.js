import {AppState, Linking, PermissionsAndroid} from 'react-native';
import {isAndroid, isIOS} from "../../utils/platform";
import NativeConfigs from "../../InstacarNativeModules/NativeConfigs";
import PermissionsComponent from "react-native-permissions";
import {DIALOG_IDS} from "../../constants/enums2";


export async function checkForCameraPermission(permissionType, displayAlert) {


    let check, request, requestResponse, message;
    if (permissionType === 'camera') {
        check = () => PermissionsComponent.check('camera');
        request = () => PermissionsComponent.request('camera');
        message = DIALOG_IDS.PERMISSION_DENIED_CAMERA;
    }
    else if (permissionType === 'album') {
        check = () => PermissionsComponent.check('photo');
        request = () => PermissionsComponent.request('photo');
        message = DIALOG_IDS.PERMISSION_DENIED_ALBUM;
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
    if (result === 'undetermined' || (result === 'denied' && isAndroid())) {
        requestResponse = await request();
        return requestResponse === 'authorized';
    }

    // native dialogs for permission will not be visible anymore, prompt user to settings
    displayAlert(message);
    return false;
}

export function goToSettings(props) {

    if (isIOS()) {
        Linking.canOpenURL('app-settings:').then(supported => {
            if (!supported) {
                props.displayAlert(DIALOG_IDS.CANT_OPEN_SETTINGS);
                // console.log('Can\'t handle settings url');
            } else {
                // this.props.popScreen();
                setTimeout(() => Linking.openURL('app-settings:'), 350);
                {/*return Linking.openURL('app-settings:');*/
                }
            }
        }).catch(err => {
            props.displayAlert(DIALOG_IDS.CANT_OPEN_SETTINGS);
            console.log(err);
        });
    }
    else {
        props.popScreen();
        NativeConfigs.openPermissions();
    }
}
