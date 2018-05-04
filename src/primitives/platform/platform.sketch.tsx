import { PLATFORM } from '../../utils/enums';

let windowHeight = 767, windowWidth = 1767;

export const isWeb = false;
export const isIOS = false;
export const isAndroid = false;
export const isSketch = true;
export const getWindowHeight = () => windowHeight;
export const getWindowWidth = () => windowWidth;
export const setWindowHeight = (newHeight: number) => {
    windowHeight = newHeight;
};
export const setWindowWidth = (newWidth: number) => {
    windowWidth = newWidth;
};

export const getStorage = (): any => {
    return {};
};

export function getPlatform(): PLATFORM {
    return PLATFORM.WEB;
}

