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
// import { updateTheme, getStyles } from 'src/utils/combineStyles';
// import {ios, native, web} from 'src/utils/theme';
// import {isWeb, isIOS, isAndroid} from 'src/utils/platform/platform';
//
// const containerPadding1 = {
//     container: {
//         padding: 1
//     }
// };
//
// const containerPadding2 = {
//     container: {
//         padding: 2
//     }
// };
//
//
// describe('getStyles', () => {
//     it('extracts the right styles according to the platform when platform name is before classname', () => {
//         const theme = {
//             [web]: {
//                 container: {
//                     padding: 1,
//                 },
//             },
//             [ios]: {
//                 container: {
//                     margin: 2,
//                 }
//             },
//             [native]: {
//                 container: {
//                     borderWidth: 1
//                 }
//             }
//         };
//         isWeb && expect(getStyles(theme)).toEqual({container: {padding: 1}});
//         isIOS && expect(getStyles(theme)).toEqual({container: {margin: 2, borderWidth: 1}});
//         isAndroid && expect(getStyles(theme)).toEqual({container: {borderWidth: 1}});
//     });
//
//     it('extracts the right styles according to the platform when platform name is inside the class definition', () => {
//         const theme = {
//             container: {
//                 [web]: {
//                     padding: 1,
//                 },
//                 [ios]: {
//                     padding: 2,
//                 }
//             }
//         };
//         expect(getStyles(theme)).toEqual({container: {padding: 1}});
//     });
//
//     it('getStyles extracts the web styles, and ignores ios styles when running on web, platform inside classname', () => {
//         const theme = {
//             container: {
//                 [web]: {
//                     padding: 1,
//                 },
//                 [ios]: {
//                     padding: 2,
//                 }
//             }
//         };
//         expect(getStyles(theme)).toEqual({container: {padding: 1}});
//     });
//
//     it('getStyles extracts the ios styles, and ignores ios styles when running on web, platform inside classname', () => {
//         const theme = {
//             container: {
//                 [web]: {
//                     padding: 1,
//                 },
//                 [ios]: {
//                     padding: 2,
//                 }
//             }
//         };
//         expect(getStyles(theme)).toEqual({container: {padding: 1}});
//     });
//
//     test('media queries are returned on web', () => {
//        const theme = {
//            '@media (min-width: 1024px)': {
//                button: {
//                    width: 200
//                }
//            }
//        };
//        expect(getStyles(theme)).toEqual({});
//     });
//
//     it('updating only ', () => {
//         expect(updateTheme(containerPadding1, containerPadding2)).toEqual(containerPadding2);
//     });
//
// });
System.register("src/primitives/View/View", ["react"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, View;
    return {
        setters: [
            function (React_1) {
                React = React_1;
            }
        ],
        execute: function () {
            ;
            View = /** @class */ (function (_super) {
                __extends(View, _super);
                function View() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                View.prototype.render = function () {
                    var _a = this.props, children = _a.children, style = _a.style, collapsable = _a.collapsable, accessible = _a.accessible, otherProps = __rest(_a, ["children", "style", "collapsable", "accessible"]);
                    return (React.createElement("div", __assign({}, otherProps), children));
                };
                return View;
            }(React.PureComponent));
            exports_1("View", View);
        }
    };
});
System.register("src/primitives/Text/Text", ["react"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var React, Text;
    return {
        setters: [
            function (React_2) {
                React = React_2;
            }
        ],
        execute: function () {
            exports_2("Text", Text = function (_a) {
                var classes = _a.classes, children = _a.children, style = _a.style, onPress = _a.onPress;
                return (React.createElement("div", { onClick: onPress && (function (event) {
                        event.preventDefault();
                        onPress();
                    }) }, children));
            });
        }
    };
});
System.register("src/index", ["src/primitives/View/View", "src/primitives/Text/Text"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (View_1_1) {
                exports_3({
                    "View": View_1_1["View"]
                });
            },
            function (Text_1_1) {
                exports_3({
                    "Text": Text_1_1["Text"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/primitives/Text/Text.sketch", ["react-sketchapp"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (react_sketchapp_1_1) {
                exports_4({
                    "Text": react_sketchapp_1_1["Text"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/primitives/View/View.sketch", ["react", "react-sketchapp"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var React, react_sketchapp_2, View;
    return {
        setters: [
            function (React_3) {
                React = React_3;
            },
            function (react_sketchapp_2_1) {
                react_sketchapp_2 = react_sketchapp_2_1;
            }
        ],
        execute: function () {
            exports_5("View", View = function (_a) {
                var children = _a.children;
                return React.createElement(react_sketchapp_2.View, null,
                    children,
                    children);
            });
        }
    };
});
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
System.register("src/utils/platform/platform", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var isWeb, isIOS, isAndroid, isSketch, getWindowHeight, getWindowWidth;
    return {
        setters: [],
        execute: function () {
            exports_6("isWeb", isWeb = true);
            exports_6("isIOS", isIOS = false);
            exports_6("isAndroid", isAndroid = false);
            exports_6("isSketch", isSketch = false);
            exports_6("getWindowHeight", getWindowHeight = function () { return window.innerHeight; });
            exports_6("getWindowWidth", getWindowWidth = function () { return window.innerWidth; });
        }
    };
});
System.register("src/utils/theme", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var XS_BREAKING_POINT, all, android, ios, native, web, webMobile, webDesktop;
    return {
        setters: [],
        execute: function () {
            exports_7("XS_BREAKING_POINT", XS_BREAKING_POINT = 768);
            exports_7("all", all = 'all');
            exports_7("android", android = 'android');
            exports_7("ios", ios = 'ios');
            exports_7("native", native = 'native');
            exports_7("web", web = 'web');
            exports_7("webMobile", webMobile = 'webMobile');
            exports_7("webDesktop", webDesktop = 'webDesktop');
        }
    };
});
System.register("src/utils/common", ["src/utils/platform/platform", "src/utils/theme"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function isObject(obj) {
        return obj && obj instanceof Object && obj.constructor === Object;
    }
    exports_8("isObject", isObject);
    var platform_1, theme_1, isXs;
    return {
        setters: [
            function (platform_1_1) {
                platform_1 = platform_1_1;
            },
            function (theme_1_1) {
                theme_1 = theme_1_1;
            }
        ],
        execute: function () {
            exports_8("isXs", isXs = function () { return platform_1.getWindowWidth() < theme_1.XS_BREAKING_POINT; });
        }
    };
});
// import * as React from 'react';
// import {withStyles, WithStyles} from 'material-ui/styles';
// import { StyleRules } from './createStyles.types';
//
// export function createStyles<T>(styles: StyleRules,
//                                 componentName: string,
//                                 WrappedComponent: React.ComponentType<T & WithStyles>,
//                                 name?: string,): React.ComponentType<T> {
//     return withStyles(
//         () => {
//             return combineStyles(styles, componentName, appTheme)
//         }
//     )(WrappedComponent);
// } 
System.register("src/utils/createStyles/createStyles.types", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/utils/platform/platform.native", ["react-native"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var react_native_1, isWeb, isIOS, isAndroid, isSketch, getWindowHeight, getWindowWidth;
    return {
        setters: [
            function (react_native_1_1) {
                react_native_1 = react_native_1_1;
            }
        ],
        execute: function () {
            exports_10("isWeb", isWeb = false);
            exports_10("isIOS", isIOS = react_native_1.Platform.OS === 'ios');
            exports_10("isAndroid", isAndroid = react_native_1.Platform.OS === 'android');
            exports_10("isSketch", isSketch = false);
            exports_10("getWindowHeight", getWindowHeight = function () { return react_native_1.Dimensions.get('window').height; });
            exports_10("getWindowWidth", getWindowWidth = function () { return react_native_1.Dimensions.get('window').width; });
        }
    };
});
System.register("src/utils/platform/platform.sketch", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var isWeb, isIOS, isAndroid, isSketch, getWindowHeight, getWindowWidth;
    return {
        setters: [],
        execute: function () {
            exports_11("isWeb", isWeb = false);
            exports_11("isIOS", isIOS = false);
            exports_11("isAndroid", isAndroid = false);
            exports_11("isSketch", isSketch = true);
            exports_11("getWindowHeight", getWindowHeight = function () { return 767; });
            exports_11("getWindowWidth", getWindowWidth = function () { return 767; });
        }
    };
});
//# sourceMappingURL=primitives.js.map