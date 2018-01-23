'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var theme_1 = require("../../utils/theme");
var __1 = require("../..");
var styles = function () {
    return ({
        button: (_a = {},
            _a[theme_1.android] = {
                elevation: 4,
                borderRadius: 2,
                flexDirection: 'row',
            },
            _a[theme_1.all] = {
                padding: 14,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
            _a),
        disabledView: (_b = {
                backgroundColor: '#a1a1a1'
            },
            _b[theme_1.android] = {
                elevation: 0,
            },
            _b),
        disabledText: {
            color: '#cdcdcd',
        },
        primaryView: {
            backgroundColor: theme_1.appTheme.primaryColor,
        },
        primaryText: {
            color: theme_1.appTheme.primaryTextColor,
        },
        text: {
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 14,
        },
        shadowedButton: (_c = {},
            _c[theme_1.android] = {},
            _c[theme_1.all] = {
                shadowColor: '#000',
                // shadowOffset: {
                //     width: 0,
                //     height: 2
                // },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            _c),
        iconStyle: {
            width: 24,
            height: 24,
            marginLeft: 16,
            marginRight: 16,
        }
    });
    var _a, _b, _c;
};
var CButton = function (_a) {
    var children = _a.children, classes = _a.classes, disabled = _a.disabled, icon = _a.icon, onPress = _a.onPress, primary = _a.primary, raised = _a.raised, styles = _a.styles, title = _a.title;
    // use TouchableComponent for Ripple effect
    return (React.createElement(__1.Touchable, { disabled: disabled, activeOpacity: 0.3, onPress: onPress, underlayColor: 'transparent', style: [
            classes.button,
            disabled && classes.disabledView,
            raised && classes.shadowedButton,
            primary && classes.primaryView,
            styles && styles.root
        ] },
        React.createElement(__1.View, null,
            icon &&
                React.createElement(__1.Image, { style: [classes.iconStyle, styles && styles.icon], source: icon }),
            !!title
                ? React.createElement(__1.Text, { style: [
                        classes.text,
                        primary && classes.primaryText,
                        disabled && classes.disabledText,
                        styles && styles.label
                    ] }, title)
                : null,
            children)));
};
var componentName = 'Button';
exports.Button = __1.createStyles(styles, componentName, CButton);
//# sourceMappingURL=Button.native.js.map