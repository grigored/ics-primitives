"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("material-ui/styles");
var web_1 = require("../../utils/web");
var __1 = require("../..");
web_1.loadRoboto();
exports.ThemeProvider = function (_a) {
    var children = _a.children;
    return (React.createElement(styles_1.MuiThemeProvider, { theme: styles_1.createMuiTheme(web_1.getMuiTheme(__1.appTheme)) }, children));
};
//# sourceMappingURL=ThemeProvider.js.map