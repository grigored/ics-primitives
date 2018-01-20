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
import { isObject } from "./common";
import { isIOS, isWeb, isAndroid } from "./platform/platform";
var updateTheme = function (currentTheme, remoteTheme) {
    if (!remoteTheme) {
        return;
    }
    for (var key in remoteTheme) {
        currentTheme[key] = getStyles(currentTheme[key]);
        remoteTheme[key] = getStyles(remoteTheme[key]);
        if (isObject(remoteTheme[key])) {
            if (!currentTheme[key]) {
                currentTheme[key] = {};
            }
            updateTheme(currentTheme[key], remoteTheme[key]);
        }
        else {
            if (remoteTheme[key] !== undefined) {
                currentTheme[key] = remoteTheme[key];
            }
            else {
                delete currentTheme[key];
            }
        }
    }
    return currentTheme;
};
var getStyles = function (theme) {
    if (!isObject(theme)) {
        return theme;
    }
    var platform = null, webDesktop = theme.webDesktop, webMobile = theme.webMobile, web = theme.web, ios = theme.ios, android = theme.android, native = theme.native, all = theme.all, other = __rest(theme, ["webDesktop", "webMobile", "web", "ios", "android", "native", "all"]);
    if (isWeb && webDesktop !== undefined && !isXs()) {
        platform = 'webDesktop';
    }
    else if (isWeb && webMobile !== undefined && isXs()) {
        platform = 'webMobile';
    }
    else if (isWeb && web !== undefined) {
        platform = 'web';
    }
    else if (isIOS && ios !== undefined) {
        platform = 'ios';
    }
    else if (isAndroid && android !== undefined) {
        platform = 'android';
    }
    else if (!isWeb && native !== undefined) {
        platform = 'native';
    }
    else if (all !== undefined) {
        platform = 'all';
    }
    if (platform) {
        if (theme[platform] !== undefined) {
            if (isObject(theme[platform])) {
                return getStyles(__assign({}, (theme[platform] || {}), (other || {})));
                // return {...(theme[platform] || {}), ...(other || {})};
            }
            return theme[platform];
        }
    }
    return Object.keys(other).length > 0 ? other : undefined;
};
export function combineStyles(componentStyles, componentName, muiTheme) {
    if (muiTheme === void 0) { muiTheme = null; }
    var stylesIsFunction = typeof (componentStyles) === "function";
    var fullStyles = updateTheme({}, __assign({}, (appTheme.baseStyles || {}), ((stylesIsFunction ? componentStyles(muiTheme) : componentStyles) || {})));
    var newStyles = {};
    var _loop_1 = function (className) {
        if (!isWeb && (className.indexOf('media') !== -1 || !fullStyles[className])) {
            return "continue";
        }
        var styleDefinition = __assign({}, (fullStyles[className] || {}), ((appTheme[componentName] && appTheme[componentName][className]) || {}));
        // TODO: support media queries on native
        Object.keys(styleDefinition)
            .forEach(function (key) {
            // DO NOT REMOVE FALSE, as that will make bottom: 0 not work
            // TODO: support media queries on mobile for better tablet experience
            // if (key.indexOf('media') !== -1) {
            // console.log(styleDefinition[key])
            // }
            if (styleDefinition[key] === false) {
                delete styleDefinition[key];
            }
        });
        newStyles[className] = __assign({}, styleDefinition);
    };
    for (var className in fullStyles) {
        _loop_1(className);
    }
    return newStyles;
}
//# sourceMappingURL=combineStyles.js.map