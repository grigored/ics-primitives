import * as React from "react";
import MaterialButton from "material-ui/Button";
export var Button = function (_a) {
    var children = _a.children, disabled = _a.disabled, icon = _a.icon, onPress = _a.onPress, href = _a.href, primary = _a.primary, raised = _a.raised, styles = _a.styles, title = _a.title;
    return (React.createElement(MaterialButton, { classes: styles, color: primary ? "primary" : undefined, disabled: disabled, href: href, onClick: onPress, raised: raised },
        !!title ? title : null,
        children));
};
//# sourceMappingURL=Button.js.map