var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { appTheme, createStyles, View } from "../..";
import { Topbar } from "../Topbar/Topbar";
import { DrawerWeb } from '../DrawerWeb/DrawerWeb';
import { web } from "../../utils/theme";
var styles = function () {
    return ({
        appFrame: {
            position: 'absolute',
            fontFamily: 'Roboto',
            height: '100%',
            display: 'flex',
            width: '100%',
            flex: 1,
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 20,
        },
        hide: {
            display: 'none',
        },
        content: {
            display: 'flex',
            width: '100%',
            flexGrow: 1,
            // backgroundColor: muiTheme.palette.background.default,
            // transition: muiTheme.transitions.create('margin', {
            //     easing: muiTheme.transitions.easing.sharp,
            //     duration: muiTheme.transitions.duration.leavingScreen,
            // }),
            // marginTop: 56,
            position: 'relative',
            overflow: 'hidden',
            marginTop: (_a = {},
                _a[web] = appTheme.topBarHeight,
                _a),
        },
        contentPersistent: {
            marginLeft: -appTheme.drawerWidth,
        },
        contentShift: {
            marginLeft: 0,
        },
        logo: {
            height: 48,
            width: 'auto',
        },
    });
    var _a;
};
var CAppContainerWeb = /** @class */ (function (_super) {
    __extends(CAppContainerWeb, _super);
    function CAppContainerWeb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CAppContainerWeb.prototype.render = function () {
        var _a = this.props, classes = _a.classes, children = _a.children, drawerContent = _a.drawerContent, drawerOpen = _a.drawerOpen, drawerPersistent = _a.drawerPersistent, onDrawerClose = _a.onDrawerClose;
        return (React.createElement(View, { style: classes.appFrame },
            React.createElement(Topbar
            // leftButtonIcon={(isXs() || isAdmin(userData)) &&
            // <MenuIcon style={{color: appTheme.topbarContrastColor}}/>}
            // leftButtonOnPress={toggleDrawer.bind(this, null, !drawerOpen)}
            , { 
                // leftButtonIcon={(isXs() || isAdmin(userData)) &&
                // <MenuIcon style={{color: appTheme.topbarContrastColor}}/>}
                // leftButtonOnPress={toggleDrawer.bind(this, null, !drawerOpen)}
                drawerOpen: !!drawerOpen, title: "ASD" }),
            React.createElement(DrawerWeb, { persistent: drawerPersistent, open: drawerOpen, onDrawerClose: onDrawerClose }, drawerContent),
            React.createElement(View, { style: [
                    classes.content,
                    drawerOpen && classes.contentShift,
                    drawerPersistent && classes.contentPersistent,
                ] }, children)));
    };
    return CAppContainerWeb;
}(React.PureComponent));
export var AppContainerWeb = createStyles(styles, "AppContainerWeb", CAppContainerWeb);
//# sourceMappingURL=AppContainerWeb.js.map