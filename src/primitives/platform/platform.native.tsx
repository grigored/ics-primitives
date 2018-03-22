import {AsyncStorage, Dimensions, Platform} from 'react-native';
import { PLATFORM } from '../../utils/enums';

export const isWeb = false;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isSketch = false;
export const getWindowHeight = () => Dimensions.get('window').height;
export const getWindowWidth = () => Dimensions.get('window').width;
export const getStorage = (): any => {
    return AsyncStorage;
};

export function getPlatform(): PLATFORM {
    return isIOS ? PLATFORM.IOS : PLATFORM.ANDROID;
}
