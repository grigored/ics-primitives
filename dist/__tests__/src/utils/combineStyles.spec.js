"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var combineStyles_1 = require("src/utils/combineStyles");
var theme_1 = require("src/utils/theme");
var platform_1 = require("src/primitives/platform/platform");
describe('removePlatform()', function () {
    it('extracts the right styles according to the platform when platform name is before classname', function () {
        var theme = {
            container: {
                padding: (_a = {},
                    _a[theme_1.web] = 1,
                    _a[theme_1.ios] = 2,
                    _a[theme_1.all] = 3,
                    _a),
                margin: 1,
            },
        };
        platform_1.isWeb && expect(combineStyles_1.removePlatform(theme)).toEqual({ container: { padding: 1, margin: 1 } });
        platform_1.isIOS && expect(combineStyles_1.removePlatform(theme)).toEqual({ container: { padding: 2, margin: 1 } });
        platform_1.isAndroid && expect(combineStyles_1.removePlatform(theme)).toEqual({ container: { padding: 3, margin: 1 } });
        var _a;
    });
    it('extracts the right styles according to the platform when platform name is inside the class definition', function () {
        var theme = {
            container: (_a = {},
                _a[theme_1.web] = {
                    padding: 1,
                },
                _a[theme_1.ios] = {
                    padding: 2,
                },
                _a[theme_1.all] = {
                    padding: 3,
                },
                _a[theme_1.native] = {
                    padding: 4,
                },
                _a.margin = 1,
                _a),
        };
        platform_1.isWeb && expect(combineStyles_1.removePlatform(theme)).toEqual({ container: { padding: 1, margin: 1 } });
        platform_1.isIOS && expect(combineStyles_1.removePlatform(theme)).toEqual({ container: { padding: 2, margin: 1 } });
        platform_1.isAndroid && expect(combineStyles_1.removePlatform(theme)).toEqual({ container: { padding: 4, margin: 1 } });
        var _a;
    });
    test('media queries are returned on web, but not on native', function () {
        var theme = {
            '@media (min-width: 1024px)': {
                button: {
                    width: 200
                }
            }
        };
        platform_1.isWeb && expect(combineStyles_1.removePlatform(theme)).toEqual(theme);
        platform_1.isIOS && expect(combineStyles_1.removePlatform(theme)).toEqual({});
    });
});
describe('combineStyles()', function () {
    it('returns the right class names', function () {
        var styles = {
            content: {
                marginTop: (_a = {},
                    _a[theme_1.web] = 5,
                    _a),
            },
        }, expectedWeb = { content: { marginTop: 5 } };
        platform_1.isWeb && expect(combineStyles_1.combineStyles(styles, "test")).toEqual(expectedWeb);
        platform_1.isWeb && expect(combineStyles_1.combineStyles(function () { return styles; }, "test")).toEqual(expectedWeb);
        platform_1.isIOS && expect(combineStyles_1.combineStyles(styles, 'text').toEqual({ content: {} }));
        var _a;
    });
});
//# sourceMappingURL=combineStyles.spec.js.map