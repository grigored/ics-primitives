"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("../platform/platform");
var react_native_1 = require("react-native");
exports.Touchable = platform_1.isIOS ? react_native_1.TouchableOpacity : react_native_1.TouchableNativeFeedback;
//# sourceMappingURL=Touchable.native.js.map