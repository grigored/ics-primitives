var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from "react";
import MaterialButton from "material-ui/Button";
import { BUTTON_TYPE } from "../enums";
import { Image, Text, View } from "../..";
import { appTheme } from "../../utils/theme";
import { createStyles } from "../../primitives/createStyles/createStyles";
import { getStyleProps } from "../../utils/web";
var styles = {
    iconStyle: {
        width: 24,
        height: 24,
        marginLeft: 16,
        marginRight: 16,
    },
    labelStyle: {
        textAlign: 'center',
        // color: 'white',
        fontWeight: 500,
        margin: 'auto',
    },
    touchableStyle: {
        margin: 2,
        padding: 2,
    }
};
var CButton = function (_a) {
    var type = _a.type, onPress = _a.onPress, disabled = _a.disabled, style = _a.style, title = _a.title, labelColor = _a.labelColor, backgroundColor = _a.backgroundColor, icon = _a.icon, iconStyle = _a.iconStyle, labelStyle = _a.labelStyle, touchableStyle = _a.touchableStyle, classes = _a.classes, children = _a.children;
    return (React.createElement(MaterialButton, __assign({}, getStyleProps([
        classes.touchableStyle,
        touchableStyle,
        {
            color: labelColor ? labelColor : (type === BUTTON_TYPE.RAISED ? appTheme.primaryTextColor : null),
            backgroundColor: backgroundColor ? backgroundColor : (type === BUTTON_TYPE.RAISED ? appTheme.primaryColor : null),
        }
    ]), { raised: type === BUTTON_TYPE.RAISED, onClick: onPress, disabled: disabled }), children
        ? children
        : React.createElement(View, { style: style },
            typeof title === 'string'
                ? React.createElement(Text, { style: [labelStyle, labelColor && { color: labelColor }] }, title)
                : title,
            icon &&
                React.createElement(View, { style: [iconStyle, classes.iconStyle] },
                    React.createElement(Image, { source: icon })))));
};
var componentName = 'Button';
export var Button = createStyles(styles, componentName, CButton);
//# sourceMappingURL=Button.js.map