import * as React from 'react';
import { Paper } from '../Paper/Paper';
import { appTheme, Text, View } from '../..';
import { createStyles } from "../..";
import { Button } from '../Button/Button';
var styles = function () { return ({
    container: {
        backgroundColor: appTheme.primaryColor,
        width: '100%',
        height: appTheme.topBarHeight,
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: appTheme.primaryTextColor,
        fontSize: 24,
        fontWeight: 500,
    },
    buttonColor: {
        color: appTheme.primaryTextColor,
    }
}); };
var CTopbar = function (_a) {
    var classes = _a.classes, title = _a.title, rightButtonsData = _a.rightButtonsData;
    return (React.createElement(Paper, { style: classes.container, name: 'Topbar' },
        React.createElement(Text, { style: classes.text }, title),
        React.createElement(View, null, rightButtonsData && rightButtonsData.map(function (buttonData) {
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
export var Topbar = createStyles(styles, 'Topbar', CTopbar);
//# sourceMappingURL=Topbar.sketch.js.map