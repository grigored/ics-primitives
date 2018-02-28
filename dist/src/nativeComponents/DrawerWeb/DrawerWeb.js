"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Drawer_1 = require("material-ui/Drawer");
var __1 = require("../..");
var styles = {
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: __1.appTheme.drawerWidth,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    drawerDocked: {
        height: '100%',
    },
};
var CDrawerWeb = function (_a) {
    var children = _a.children, classes = _a.classes, open = _a.open, onDrawerClose = _a.onDrawerClose, persistent = _a.persistent;
    return (React.createElement(Drawer_1.default, { type: persistent ? "persistent" : "temporary", classes: {
            paper: classes.drawerPaper,
            docked: classes.drawerDocked,
        }, open: open, onClose: onDrawerClose }, children));
};
exports.DrawerWeb = __1.createStyles(styles, 'DrawerWeb', CDrawerWeb);
//# sourceMappingURL=DrawerWeb.js.map