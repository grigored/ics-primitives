import * as React from 'react';
import Drawer from "material-ui/Drawer";
import { appTheme, createStyles } from "../..";
var styles = {
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: appTheme.drawerWidth,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    drawerDocked: {
        height: '100%',
    },
};
var CDrawerWeb = function (_a) {
    var children = _a.children, classes = _a.classes, open = _a.open, onDrawerClose = _a.onDrawerClose, persistent = _a.persistent;
    return (React.createElement(Drawer, { type: persistent ? "persistent" : "temporary", classes: {
            paper: classes.drawerPaper,
            docked: classes.drawerDocked,
        }, open: open, onClose: onDrawerClose }, children));
};
export var DrawerWeb = createStyles(styles, 'DrawerWeb', CDrawerWeb);
//# sourceMappingURL=DrawerWeb.js.map