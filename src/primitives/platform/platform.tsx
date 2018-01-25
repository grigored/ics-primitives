import {default as localForage} from "localforage";

export const isWeb = true;
export const isIOS = false;
export const isAndroid = false;
export const isSketch = false;
export const getWindowHeight = () => window.innerHeight;
export const getWindowWidth = () => window.innerWidth;
export const storage = localForage;