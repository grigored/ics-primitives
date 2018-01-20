"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var platform_1 = require("../primitives/platform/platform");
var theme_1 = require("./theme");
exports.removePlatform = function (theme) {
    if (!common_1.isObject(theme)) {
        return theme;
    }
    var webDesktop = theme.webDesktop, webMobile = theme.webMobile, web = theme.web, ios = theme.ios, android = theme.android, native = theme.native, all = theme.all, other = __rest(theme, ["webDesktop", "webMobile", "web", "ios", "android", "native", "all"]);
    // other.values is either [] or list of objects
    var value = undefined;
    if (platform_1.isWeb && webDesktop !== undefined && !common_1.isXs()) {
        value = webDesktop;
    }
    else if (platform_1.isWeb && webMobile !== undefined && common_1.isXs()) {
        value = webMobile;
    }
    else if (platform_1.isWeb && web !== undefined) {
        value = web;
    }
    else if (platform_1.isIOS && ios !== undefined) {
        value = ios;
    }
    else if (platform_1.isAndroid && android !== undefined) {
        value = android;
    }
    else if (!platform_1.isWeb && native !== undefined) {
        value = native;
    }
    else if (all !== undefined) {
        value = all;
    }
    if (value !== undefined && !common_1.isObject(value)) {
        return value;
    }
    var cleanedOther = {};
    for (var _i = 0, _a = Object.keys(other); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!platform_1.isWeb && key.indexOf('media') !== -1) {
            // TODO: use media queries for webMobile/webDesktop and support media queries on native
            continue;
        }
        cleanedOther[key] = exports.removePlatform(other[key]);
    }
    return __assign({}, (value === undefined ? {} : value), cleanedOther);
};
//
function combineStyles(componentStyles, componentName) {
    var fullStyles = typeof (componentStyles) === "function" ? componentStyles() : componentStyles;
    var newStyles = {};
    for (var className in fullStyles) {
        var styleDefinition = __assign({}, (fullStyles[className] || {}), ((theme_1.runTimeClasses[componentName] && theme_1.runTimeClasses[componentName][className])
            || {}));
        newStyles[className] = __assign({}, styleDefinition);
    }
    return newStyles;
}
exports.combineStyles = combineStyles;
//# sourceMappingURL=combineStyles.js.map