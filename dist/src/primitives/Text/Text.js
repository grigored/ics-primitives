var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from "react";
import { getStyleProps } from '../../utils/web';
export var Text = function (_a) {
    var classes = _a.classes, children = _a.children, style = _a.style, onPress = _a.onPress;
    return (React.createElement("span", __assign({}, getStyleProps(style), { onClick: onPress && (function (event) {
            event.preventDefault();
            onPress();
        }) }), children));
};
//# sourceMappingURL=Text.js.map