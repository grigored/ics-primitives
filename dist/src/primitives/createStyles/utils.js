"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoist_non_react_statics_1 = require("../../lib/hoist-non-react-statics");
var combineStyles_1 = require("../../utils/combineStyles");
/**
 * some method
 * @param {StyleRules | (() => StyleRules)} styles
 * @param {string} componentName
 * @param {React.ComponentType<T & WithStyles>} WrappedComponent
 * @param {(styles: StyleRules) => StyleSheetClasses} StyleSheetCreate
 * @returns {React.ComponentType<T>}
 * @public
 */
exports.createStylesGeneric = function (styles, componentName, WrappedComponent, StyleSheetCreate) {
    var Enhance = /** @class */ (function (_super) {
        __extends(Enhance, _super);
        function Enhance() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Enhance.prototype.render = function () {
            return (React.createElement(WrappedComponent, __assign({ classes: StyleSheetCreate(combineStyles_1.combineStyles(styles, componentName)) }, this.props)));
        };
        return Enhance;
    }(React.Component));
    // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
    hoist_non_react_statics_1.hoistNonReactStatics(Enhance, WrappedComponent);
    return Enhance;
};
//# sourceMappingURL=utils.js.map