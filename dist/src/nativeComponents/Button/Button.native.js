'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { BUTTON_TYPE } from "../enums";
import { android, appTheme, ios } from "../../utils/theme";
import { createStyles, Image, Text, Touchable, View } from "../..";
var styles = function () {
    return ({
        button: (_a = {},
            _a[ios] = {
                // height: 24,
                paddingLeft: 14,
                paddingRight: 14,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
            _a[android] = {
                elevation: 4,
                borderRadius: 2,
                flexDirection: 'row',
            },
            _a),
        primaryView: {
            backgroundColor: appTheme.primaryColor,
        },
        primaryText: {
            color: 'white'
        },
        text: (_b = {},
            _b[ios] = {
                color: appTheme.primaryColor,
                textAlign: 'center',
                // padding: 8,
                fontSize: 14,
                fontWeight: '500',
            },
            _b[android] = {
                textAlign: 'center',
                color: 'white',
                // padding: 8,
                fontWeight: '500',
            },
            _b),
        shadowedButton: (_c = {},
            _c[ios] = {
                shadowColor: '#000',
                // shadowOffset: {
                //     width: 0,
                //     height: 2
                // },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            _c),
        buttonDisabled: (_d = {},
            _d[ios] = {
                backgroundColor: '#a1a1a1',
            },
            _d[android] = {
                elevation: 0,
                backgroundColor: '#a1a1a1',
            },
            _d),
        textDisabled: (_e = {},
            _e[ios] = {
                color: '#cdcdcd',
            },
            _e[android] = {
                color: '#cdcdcd',
            },
            _e),
        iconStyle: {
            width: 24,
            height: 24,
            marginLeft: 16,
            marginRight: 16,
        }
    });
    var _a, _b, _c, _d, _e;
};
var CButton = function (_a) {
    var labelColor = _a.labelColor, backgroundColor = _a.backgroundColor, onPress = _a.onPress, title = _a.title, disabled = _a.disabled, style = _a.style, labelStyle = _a.labelStyle, type = _a.type, classes = _a.classes, icon = _a.icon, iconStyle = _a.iconStyle, testProps = _a.testProps, touchableStyle = _a.touchableStyle;
    // use TouchableComponent for Ripple effect
    return (React.createElement(Touchable, __assign({}, (testProps || {}), { testProps: testProps, disabled: disabled, activeOpacity: 0.3, onPress: onPress, underlayColor: 'transparent', style: touchableStyle }),
        React.createElement(View, { style: [
                classes.button,
                type === BUTTON_TYPE.RAISED && classes.shadowedButton,
                style,
                disabled && classes.buttonDisabled,
                !disabled && backgroundColor && { backgroundColor: backgroundColor }
            ] },
            icon &&
                React.createElement(Image, { style: [classes.iconStyle, iconStyle], source: icon }),
            typeof title === 'string'
                ? React.createElement(Text, { style: [
                        classes.text,
                        disabled && classes.textDisabled,
                        labelStyle,
                        !disabled && labelColor && { color: labelColor }
                    ] }, title)
                : title)));
};
var componentName = 'Button';
export var Button = createStyles(styles, componentName, CButton);
//# sourceMappingURL=Button.native.js.map