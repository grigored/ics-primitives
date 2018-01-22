var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { appTheme, Text, View } from '../..';
import { createStyles } from "../..";
import { defaultClasses } from "../../utils/theme";
var styles = function () { return ({
    container: __assign({ backgroundColor: appTheme.primaryColor, width: '100%', height: appTheme.topBarHeight }, defaultClasses.paper, { paddingLeft: 24, paddingRight: 24 }),
    text: {
        color: appTheme.primaryTextColor,
        fontSize: 24,
        fontWeight: 500,
    }
}); };
var CTopbar = function (_a) {
    var classes = _a.classes, title = _a.title;
    return (React.createElement(View, { style: classes.container },
        React.createElement(Text, { style: classes.text }, title)));
};
export var Topbar = createStyles(styles, 'Topbar', CTopbar);
//# sourceMappingURL=Topbar.sketch.js.map