var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Button } from "../Button/Button";
import { appTheme, createStyles } from "../..";
import { getStyleProps } from "../../utils/web";
var styles = function () { return ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'fixed',
        backgroundColor: appTheme.primaryColor,
    },
    appBarShift: {
        marginLeft: appTheme.drawerWidth,
        width: "calc(100% - " + appTheme.drawerWidth + "px)",
    },
    buttonColor: {
        color: appTheme.primaryTextColor,
    }
}); };
var CTopBar = function (_a) {
    var classes = _a.classes, drawerOpen = _a.drawerOpen, leftButtonIcon = _a.leftButtonIcon, leftButtonOnPress = _a.leftButtonOnPress, rightButtonsData = _a.rightButtonsData, title = _a.title;
    return (React.createElement(AppBar, __assign({}, getStyleProps([classes.appBar, drawerOpen && classes.appBarShift])),
        React.createElement(Toolbar, null,
            leftButtonIcon &&
                React.createElement(IconButton, { "aria-label": "Menu", onClick: leftButtonOnPress }, leftButtonIcon),
            React.createElement(Typography, { type: "title", color: "inherit", className: classes.flex }, title || ''),
            rightButtonsData && rightButtonsData.map(function (buttonData) {
                if (buttonData.items) {
                    var bd = buttonData;
                    return (React.createElement(Button, { key: bd.title, title: bd.title }));
                }
                else {
                    var bd = buttonData;
                    return (React.createElement(Button, { key: bd.title, onPress: bd.onPress, title: bd.title, href: bd.href, styles: {
                            label: classes.buttonColor,
                        } }));
                }
            }))));
};
export var Topbar = createStyles(styles, 'Topbar', CTopBar);
//# sourceMappingURL=Topbar.js.map