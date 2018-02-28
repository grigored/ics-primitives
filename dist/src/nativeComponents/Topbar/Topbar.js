"use strict";
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
var AppBar_1 = require("material-ui/AppBar");
var IconButton_1 = require("material-ui/IconButton");
var Toolbar_1 = require("material-ui/Toolbar");
var Typography_1 = require("material-ui/Typography");
var Button_1 = require("../Button/Button");
var __1 = require("../..");
var web_1 = require("../../utils/web");
var styles = function () { return ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'fixed',
        backgroundColor: __1.appTheme.primaryColor,
    },
    appBarShift: {
        marginLeft: __1.appTheme.drawerWidth,
        width: "calc(100% - " + __1.appTheme.drawerWidth + "px)",
    },
    buttonColor: {
        color: __1.appTheme.primaryTextColor,
    }
}); };
var CTopBar = function (_a) {
    var classes = _a.classes, drawerOpen = _a.drawerOpen, leftButtonIcon = _a.leftButtonIcon, leftButtonOnPress = _a.leftButtonOnPress, rightButtonsData = _a.rightButtonsData, title = _a.title;
    return (React.createElement(AppBar_1.default, __assign({}, web_1.getStyleProps([classes.appBar, drawerOpen && classes.appBarShift])),
        React.createElement(Toolbar_1.default, null,
            leftButtonIcon &&
                React.createElement(IconButton_1.default, { "aria-label": "Menu", onClick: leftButtonOnPress }, leftButtonIcon),
            React.createElement(Typography_1.default, { type: "title", color: "inherit", className: classes.flex }, title || ''),
            rightButtonsData && rightButtonsData.map(function (buttonData) {
                if (buttonData.items) {
                    var bd = buttonData;
                    return (React.createElement(Button_1.Button, { key: bd.title, title: bd.title }));
                }
                else {
                    var bd = buttonData;
                    return (React.createElement(Button_1.Button, { key: bd.title, onPress: bd.onPress, title: bd.title, href: bd.href, styles: {
                            label: classes.buttonColor,
                        } }));
                }
            }))));
};
exports.Topbar = __1.createStyles(styles, 'Topbar', CTopBar);
//# sourceMappingURL=Topbar.js.map