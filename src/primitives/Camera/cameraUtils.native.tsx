import { Linking, NativeModules } from 'react-native';
import { isAndroid, isIOS } from '../../primitives/platform/platform';


export async function checkForCameraPermission( permissionType: any, showAlert: any ) {

    // @ts-ignore
    const { Permissions } = Expo;

    let check, request, requestResponse, message;
    if (permissionType === 'camera') {
        check = () => checkPermission( Permissions.CAMERA );
        request = () => requestPermission( Permissions.CAMERA );
        message = 'PERMISSION_DENIED_CAMERA';
    } else if (permissionType === 'camera_roll') {
        check = () => checkPermission( Permissions.CAMERA_ROLL );
        request = () => requestPermission( Permissions.CAMERA_ROLL );
        message = 'PERMISSION_DENIED_CAMERA_ROLL';
    } else {
        throw 'Unknown permission type';
    }
    const result = await check();

    // see https://github.com/yonahforst/react-native-permissions for result values and meaning
    if (result === 'granted') {
        return true;
    }

    // native dialogs for permission will be visible
    if (result === 'undetermined' || ( result === 'denied' && isAndroid )) {
        requestResponse = await request();
        return requestResponse === 'granted';
    }

    // native dialogs for permission will not be visible anymore, prompt user to settings
    showAlert( message );
    return false;
}

export function goToSettings( props: any ) {

    if (isIOS) {
        Linking.canOpenURL( 'app-settings:' ).then( supported => {
            if (!supported) {
                props.showAlert( 'CANT_OPEN_SETTINGS' );
            } else {
                setTimeout( () => Linking.openURL( 'app-settings:' ), 350 );
            }
        } ).catch( err => {
            props.showAlert( 'CANT_OPEN_SETTINGS' );
            console.log( err );
        } );
    }
    else {
        props.popScreen();
        NativeModules.NativeConfigs.openPermissions();
    }
}

async function checkPermission( permission: any ) {
    // @ts-ignore
    const { Permissions } = Expo;
    const { status } = await Permissions.getAsync( permission );
    return status
}

async function requestPermission( permission: any ) {
    // @ts-ignore
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync( permission );
    return status
}