"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var utils_1 = require("./utils");
function createStyles(styles, componentName, WrappedComponent) {
    return utils_1.createStylesGeneric(styles, componentName, WrappedComponent, react_native_1.StyleSheet.create);
}
exports.createStyles = createStyles;
//# sourceMappingURL=createStyles.native.js.map