import { PLATFORM } from '../../utils/enums';

export const isWeb = false;
export const isIOS = false;
export const isAndroid = false;
export const isSketch = true;
export const getWindowHeight = () => 767;
export const getWindowWidth = () => 767;
export const getStorage = (): any => {
    return {};
};

export function getPlatform(): PLATFORM {
    return PLATFORM.WEB;
}

