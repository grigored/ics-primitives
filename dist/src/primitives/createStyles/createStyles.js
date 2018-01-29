"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var styles_1 = require("material-ui/styles");
var combineStyles_1 = require("../../utils/combineStyles");
exports.createStyles = function (styles, componentName, WrappedComponent, name) {
    return styles_1.withStyles(function () { return combineStyles_1.combineStyles(styles, componentName); })(WrappedComponent);
};
//# sourceMappingURL=createStyles.js.map