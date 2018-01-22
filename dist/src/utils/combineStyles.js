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
import { isObject, isXs } from "./common";
import { isIOS, isWeb, isAndroid } from "../primitives/platform/platform";
import { runTimeClasses } from "./theme";
export var removePlatform = function (theme) {
    if (!isObject(theme)) {
        return theme;
    }
    var webDesktop = theme.webDesktop, webMobile = theme.webMobile, web = theme.web, ios = theme.ios, android = theme.android, native = theme.native, all = theme.all, other = __rest(theme, ["webDesktop", "webMobile", "web", "ios", "android", "native", "all"]);
    // other.values is either [] or list of objects
    var value = undefined;
    if (isWeb && webDesktop !== undefined && !isXs()) {
        value = webDesktop;
    }
    else if (isWeb && webMobile !== undefined && isXs()) {
        value = webMobile;
    }
    else if (isWeb && web !== undefined) {
        value = web;
    }
    else if (isIOS && ios !== undefined) {
        value = ios;
    }
    else if (isAndroid && android !== undefined) {
        value = android;
    }
    else if (!isWeb && native !== undefined) {
        value = native;
    }
    else if (all !== undefined) {
        value = all;
    }
    if (value !== undefined && !isObject(value)) {
        return value;
    }
    var cleanedOther = {};
    for (var _i = 0, _a = Object.keys(other); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!isWeb && key.indexOf('media') !== -1) {
            // TODO: use media queries for webMobile/webDesktop and support media queries on native
            continue;
        }
        cleanedOther[key] = removePlatform(other[key]);
    }
    return __assign({}, (value === undefined ? {} : value), cleanedOther);
};
//
export function combineStyles(componentStyles, componentName) {
    var fullStyles = typeof (componentStyles) === "function" ? componentStyles() : componentStyles;
    var newStyles = {};
    for (var className in fullStyles) {
        var styleDefinition = __assign({}, (fullStyles[className] || {}), ((runTimeClasses[componentName] && runTimeClasses[componentName][className])
            || {}));
        newStyles[className] = __assign({}, styleDefinition);
    }
    return newStyles;
}
//# sourceMappingURL=combineStyles.js.map