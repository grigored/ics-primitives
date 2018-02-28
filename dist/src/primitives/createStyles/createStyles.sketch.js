"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_sketchapp_1 = require("react-sketchapp");
var utils_1 = require("./utils");
function createStyles(styles, componentName, WrappedComponent) {
    return utils_1.createStylesGeneric(styles, componentName, WrappedComponent, react_sketchapp_1.StyleSheet.create);
}
exports.createStyles = createStyles;
//# sourceMappingURL=createStyles.sketch.js.map