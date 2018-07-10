import { isAndroid, isIOS, isWeb } from "../primitives/platform/platform";
import { isObject, isXs } from "./common";
import { appTheme } from "./theme";

export const removePlatform = ( theme: any ): any => {
    if (!isObject( theme )) {
        return theme;
    }

    let { webDesktop, webMobile, web, ios, android, native, all, ...other } = theme;
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

    if (value !== undefined && !isObject( value )) {
        return value;
    }
    let cleanedOther = {};
    for (let key of Object.keys( other )) {
        if (!isWeb && key.indexOf( 'media' ) !== -1) {
            // TODO: use media queries for webMobile/webDesktop and support media queries on native
            continue;
        }
        cleanedOther[key] = removePlatform( other[key] );
    }

    return {
        ...( value === undefined ? {} : value ),
        ...cleanedOther
    }
};

//
// export function combineStyles( componentStyles: any, componentName: string ): any {
//     let fullStyles = typeof( componentStyles ) === "function" ? componentStyles() : componentStyles;
//     let newStyles: any = {};
//     for (let className in fullStyles) {
//         let styleDefinition = {
//             ...removePlatform( fullStyles[className] ),
//             ...removePlatform( runTimeClasses[componentName] && runTimeClasses[componentName][className] ),
//         };
//         newStyles[className] = { ...styleDefinition };
//     }
//
//     return newStyles;
// }


function getPlatformTheme(theme: any): any {
    if (!isObject(theme)) {
        return theme;
    }

    let platform = null, {webDesktop, webMobile, web, ios, android, native, all, ...other} = theme;

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
                return getPlatformTheme({...(theme[platform] || {}), ...(other || {})});
                // return {...(theme[platform] || {}), ...(other || {})};
            }
            return theme[platform];
        }
    }
    return Object.keys(other).length > 0 ? other : undefined;
}

function updateTheme(currentTheme: any, remoteTheme: any) {
    if (!remoteTheme) {
        return;
    }
    let paramsTheme = {...remoteTheme};
    for (let key in paramsTheme) {
        currentTheme[key] = getPlatformTheme(currentTheme[key]);
        paramsTheme[key] = getPlatformTheme(paramsTheme[key]);
        if (isObject(paramsTheme[key])) {
            if (!currentTheme[key]) {
                currentTheme[key] = {};
            }

            updateTheme(currentTheme[key], paramsTheme[key]);
        }
        else {
            if (paramsTheme[key] !== undefined) {
                currentTheme[key] = paramsTheme[key];
            }
            else {
                delete currentTheme[key];
            }
        }
    }
    return currentTheme;
}

export function combineStyles(componentStyles: any, componentName: string, muiTheme: any = null): any {
    const stylesIsFunction = typeof(componentStyles) === "function";
    let fullStyles = updateTheme({}, {...(appTheme.baseStyles || {}), ...((stylesIsFunction ? componentStyles(muiTheme) : componentStyles) || {})});
    let newStyles: any = {};
    for (let className in fullStyles) {
        if (!isWeb && (className.indexOf('media') !== -1 || !fullStyles[className])) {
            // delete componentStyles[className];
            continue;
        }
        let styleDefinition = {
            ...(fullStyles[className] || {}),
            ...(
                (appTheme[componentName] && appTheme[componentName][className]) || {}
            ),
        };
        // TODO: support media queries on native
        Object.keys(styleDefinition)
            .forEach(key => {
                // DO NOT REMOVE FALSE, as that will make bottom: 0 not work
                // TODO: support media queries on mobile for better tablet experience
                // if (key.indexOf('media') !== -1) {
                // console.log(styleDefinition[key])
                // }
                if (styleDefinition[key] === false) {
                    delete styleDefinition[key];
                }
            });
        newStyles[className] = {...styleDefinition};
    }
    return newStyles;
}