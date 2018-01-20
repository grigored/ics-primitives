"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.Text = function (_a) {
    var classes = _a.classes, children = _a.children, style = _a.style, onPress = _a.onPress;
    return (React.createElement("div", { onClick: onPress && (function (event) {
            event.preventDefault();
            onPress();
        }) }, children));
};
//# sourceMappingURL=Text.js.map