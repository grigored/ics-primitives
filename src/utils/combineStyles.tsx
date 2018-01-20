// import {isObject, isXs} from "./common";
// import {isIOS, isWeb, isAndroid} from "./platform/platform";
//
//
// export const updateTheme = (currentTheme: any, remoteTheme: any) => {
//     if (!remoteTheme) {
//         return;
//     }
//     for (let key in remoteTheme) {
//         currentTheme[key] = getStyles(currentTheme[key]);
//         remoteTheme[key] = getStyles(remoteTheme[key]);
//         if (isObject(remoteTheme[key])) {
//             if (!currentTheme[key]) {
//                 currentTheme[key] = {};
//             }
//
//             updateTheme(currentTheme[key], remoteTheme[key]);
//         }
//         else {
//             if (remoteTheme[key] !== undefined) {
//                 currentTheme[key] = remoteTheme[key];
//             }
//             else {
//                 delete currentTheme[key];
//             }
//         }
//     }
//     return currentTheme;
// };
//
// export const getStyles = (theme: any): any => {
//     if (!isObject(theme)) {
//         return theme;
//     }
//
//     let platform = null,
//         {webDesktop, webMobile, web, ios, android, native, all, ...other} = theme;
//
//     if (isWeb && webDesktop !== undefined && !isXs()) {
//         platform = 'webDesktop';
//     }
//     else if (isWeb && webMobile !== undefined && isXs()) {
//         platform = 'webMobile';
//     }
//     else if (isWeb && web !== undefined) {
//         platform = 'web';
//     }
//     else if (isIOS && ios !== undefined) {
//         platform = 'ios';
//     }
//     else if (isAndroid && android !== undefined) {
//         platform = 'android';
//     }
//     else if (!isWeb && native !== undefined) {
//         platform = 'native';
//     }
//     else if (all !== undefined) {
//         platform = 'all';
//     }
//
//     if (platform) {
//         if (theme[platform] !== undefined) {
//             if (isObject(theme[platform])) {
//                 return getStyles({...(theme[platform] || {}), ...(other || {})});
//                 // return {...(theme[platform] || {}), ...(other || {})};
//             }
//             return theme[platform];
//         }
//     }
//     return Object.keys(other).length > 0 ? other : undefined;
// }
//
// export function combineStyles(componentStyles: any, componentName: string, muiTheme: any = null): any {
//     const stylesIsFunction = typeof(componentStyles) === "function";
//     let fullStyles = updateTheme({}, {...(appTheme.baseStyles || {}), ...((stylesIsFunction ? componentStyles(muiTheme) : componentStyles) || {})});
//     let newStyles: any = {};
//     for (let className in fullStyles) {
//         if (!isWeb && (className.indexOf('media') !== -1 || !fullStyles[className])) {
//             // delete componentStyles[className];
//             continue;
//         }
//         let styleDefinition = {
//             ...(fullStyles[className] || {}),
//             ...(
//                 (appTheme[componentName] && appTheme[componentName][className]) || {}
//             ),
//         };
//         // TODO: support media queries on native
//         Object.keys(styleDefinition)
//             .forEach(key => {
//                 // DO NOT REMOVE FALSE, as that will make bottom: 0 not work
//                 // TODO: support media queries on mobile for better tablet experience
//                 // if (key.indexOf('media') !== -1) {
//                 // console.log(styleDefinition[key])
//                 // }
//                 if (styleDefinition[key] === false) {
//                     delete styleDefinition[key];
//                 }
//             });
//         newStyles[className] = {...styleDefinition};
//     }
//     return newStyles;
// }
