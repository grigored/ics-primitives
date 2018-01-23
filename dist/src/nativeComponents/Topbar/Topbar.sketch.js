"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Paper_1 = require("../Paper/Paper");
var __1 = require("../..");
var __2 = require("../..");
var styles = function () { return ({
    container: {
        backgroundColor: __1.appTheme.primaryColor,
        width: '100%',
        height: __1.appTheme.topBarHeight,
        paddingLeft: 24,
        paddingRight: 24
    },
    text: {
        color: __1.appTheme.primaryTextColor,
        fontSize: 24,
        fontWeight: 500,
    }
}); };
var CTopbar = function (_a) {
    var classes = _a.classes, title = _a.title;
    return (React.createElement(Paper_1.Paper, { style: classes.container, name: 'Topbar' },
        React.createElement(__1.Text, { style: classes.text }, title)));
};
exports.Topbar = __2.createStyles(styles, 'Topbar', CTopbar);
//# sourceMappingURL=Topbar.sketch.js.map