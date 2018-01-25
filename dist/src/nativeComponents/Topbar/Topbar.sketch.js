"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Paper_1 = require("../Paper/Paper");
var __1 = require("../..");
var __2 = require("../..");
var Button_1 = require("../Button/Button");
var styles = function () { return ({
    container: {
        backgroundColor: __1.appTheme.primaryColor,
        width: '100%',
        height: __1.appTheme.topBarHeight,
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: __1.appTheme.primaryTextColor,
        fontSize: 24,
        fontWeight: 500,
    },
    buttonColor: {
        color: __1.appTheme.primaryTextColor,
    }
}); };
var CTopbar = function (_a) {
    var classes = _a.classes, title = _a.title, rightButtonsData = _a.rightButtonsData;
    return (React.createElement(Paper_1.Paper, { style: classes.container, name: 'Topbar' },
        React.createElement(__1.Text, { style: classes.text }, title),
        React.createElement(__1.View, null, rightButtonsData && rightButtonsData.map(function (buttonData) {
            return !!buttonData.items
                ? React.createElement(Button_1.Button, { key: buttonData.title, icon: buttonData.icon, title: buttonData.title, onPress: function () { } })
                : React.createElement(Button_1.Button, { key: buttonData.title, onPress: buttonData.onClick, title: buttonData.title, href: buttonData.href, styles: {
                        label: classes.buttonColor,
                    } });
        }))));
};
exports.Topbar = __2.createStyles(styles, 'Topbar', CTopbar);
//# sourceMappingURL=Topbar.sketch.js.map