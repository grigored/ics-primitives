import * as localForage from 'localforage';
import { PLATFORM } from '../../utils/enums';

export const isWeb = true;
export const isIOS = false;
export const isAndroid = false;
export const isSketch = false;
export const getWindowHeight = () => window.innerHeight;
export const getWindowWidth = () => window.innerWidth;
export const getStorage = () => {
    return localForage;
};

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {Object}
 */
export function getPlatform(): PLATFORM {
    const userAgent: string = navigator.userAgent || navigator.vendor || window.opera || '';

    // Windows Phone must come first because its UA also contains 'Android'
    if (/windows phone/i.test(userAgent)) {
        return PLATFORM.WEB_WINDOWS_PHONE;
    }

    if (/android/i.test(userAgent)) {
        return PLATFORM.WEB_ANDROID;
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return PLATFORM.WEB_IOS;
    }

    return PLATFORM.WEB;
}

