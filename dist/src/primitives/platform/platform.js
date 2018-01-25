import { default as localForage } from "localforage";
export var isWeb = true;
export var isIOS = false;
export var isAndroid = false;
export var isSketch = false;
export var getWindowHeight = function () { return window.innerHeight; };
export var getWindowWidth = function () { return window.innerWidth; };
export var storage = localForage;
//# sourceMappingURL=platform.js.map