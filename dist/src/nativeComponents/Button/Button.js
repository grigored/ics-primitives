"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("material-ui/Button");
exports.Button = function (_a) {
    var children = _a.children, disabled = _a.disabled, icon = _a.icon, onPress = _a.onPress, primary = _a.primary, raised = _a.raised, styles = _a.styles, title = _a.title;
    return (React.createElement(Button_1.default, { raised: raised, onClick: onPress, disabled: disabled, classes: styles, color: primary ? "primary" : undefined },
        !!title ? title : null,
        children));
};
//# sourceMappingURL=Button.js.map