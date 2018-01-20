import { Dimensions, Platform } from 'react-native';
export var isWeb = false;
export var isIOS = Platform.OS === 'ios';
export var isAndroid = Platform.OS === 'android';
export var isSketch = false;
export var getWindowHeight = function () { return Dimensions.get('window').height; };
export var getWindowWidth = function () { return Dimensions.get('window').width; };
//# sourceMappingURL=platform.native.js.map