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
import { appTheme, createStyles, View } from "../..";
import { getStyleProps } from "../../utils/web";
var styles = function () { return ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'absolute',
        backgroundColor: appTheme.primaryColor,
    },
    appBarShift: {
        marginLeft: appTheme.drawerWidth,
        width: "calc(100% - " + appTheme.drawerWidth + "px)",
    },
}); };
var CTopBar = function (_a) {
    var classes = _a.classes, drawerOpen = _a.drawerOpen, leftButtonIcon = _a.leftButtonIcon, leftButtonOnPress = _a.leftButtonOnPress, rightButtonsData = _a.rightButtonsData, title = _a.title;
    return (React.createElement(AppBar, __assign({}, getStyleProps([classes.appBar, drawerOpen && classes.appBarShift])),
        React.createElement(View, { style: classes.root },
            React.createElement(Toolbar, null,
                leftButtonIcon &&
                    React.createElement(IconButton, { "aria-label": "Menu", onClick: leftButtonOnPress }, leftButtonIcon),
                React.createElement(Typography, { type: "title", color: "inherit", className: classes.flex }, title || ''),
                rightButtonsData && rightButtonsData.map(function (buttonData) {
                    return !!buttonData.items
                        ? React.createElement(Button, { key: buttonData.title, icon: buttonData.icon, title: buttonData.title })
                        : React.createElement(Button, { key: buttonData.title, backgroundColor: buttonData.selected ? 'rgba(255,255,255,0.2)' : 'transparent', onPress: buttonData.onClick, title: buttonData.title });
                })))));
};
export var Topbar = createStyles(styles, 'Topbar', CTopBar);
//# sourceMappingURL=Topbar.js.map