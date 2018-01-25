"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
exports.isWeb = false;
exports.isIOS = react_native_1.Platform.OS === 'ios';
exports.isAndroid = react_native_1.Platform.OS === 'android';
exports.isSketch = false;
exports.getWindowHeight = function () { return react_native_1.Dimensions.get('window').height; };
exports.getWindowWidth = function () { return react_native_1.Dimensions.get('window').width; };
//# sourceMappingURL=platform.native.js.map