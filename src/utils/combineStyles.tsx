import { isObject, isXs } from "./common";
import { isIOS, isWeb, isAndroid } from "../primitives/platform/platform";
import { runTimeClasses } from "./theme";

export const removePlatform = (theme: any): any => {
    if (!isObject(theme)) {
        return theme;
    }

    let {webDesktop, webMobile, web, ios, android, native, all, ...other} = theme;
    // other.values is either [] or list of objects

    let value = undefined;

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
    let cleanedOther = {};
    for (let key of Object.keys(other)) {
        if (!isWeb && key.indexOf('media') !== -1) {
            // TODO: use media queries for webMobile/webDesktop and support media queries on native
            continue;
        }
        cleanedOther[key] = removePlatform(other[key]);
    }

    return {
        ...(value === undefined ? {}: value),
        ...cleanedOther
    }
};
//
export function combineStyles(componentStyles: any, componentName: string): any {
    let fullStyles = typeof(componentStyles) === "function" ? componentStyles() : componentStyles;
    let newStyles: any = {};
    for (let className in fullStyles) {
        let styleDefinition = {
            ...(fullStyles[className] || {}),
            ...(
                (runTimeClasses[componentName] && runTimeClasses[componentName][className])
                || {}
            ),
        };
        newStyles[className] = {...styleDefinition};
    }
    return newStyles;
}
