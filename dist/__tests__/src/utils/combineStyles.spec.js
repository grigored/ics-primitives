import { removePlatform } from 'src/utils/combineStyles';
import { all, ios, native, web } from 'src/utils/theme';
import { isWeb, isIOS, isAndroid } from 'src/primitives/platform/platform';
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
describe('getStyles', function () {
    it('extracts the right styles according to the platform when platform name is before classname', function () {
        var theme = {
            container: {
                padding: (_a = {},
                    _a[web] = 1,
                    _a[ios] = 2,
                    _a[all] = 3,
                    _a),
                margin: 1,
            },
        };
        isWeb && expect(removePlatform(theme)).toEqual({ container: { padding: 1, margin: 1 } });
        isIOS && expect(removePlatform(theme)).toEqual({ container: { padding: 2, margin: 1 } });
        isAndroid && expect(removePlatform(theme)).toEqual({ container: { padding: 3, margin: 1 } });
        var _a;
    });
    it('extracts the right styles according to the platform when platform name is inside the class definition', function () {
        var theme = {
            container: (_a = {},
                _a[web] = {
                    padding: 1,
                },
                _a[ios] = {
                    padding: 2,
                },
                _a[all] = {
                    padding: 3,
                },
                _a[native] = {
                    padding: 4,
                },
                _a.margin = 1,
                _a),
        };
        isWeb && expect(removePlatform(theme)).toEqual({ container: { padding: 1, margin: 1 } });
        isIOS && expect(removePlatform(theme)).toEqual({ container: { padding: 2, margin: 1 } });
        isAndroid && expect(removePlatform(theme)).toEqual({ container: { padding: 4, margin: 1 } });
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
        isWeb && expect(removePlatform(theme)).toEqual(theme);
        isIOS && expect(removePlatform(theme)).toEqual({});
    });
    // it('updating only ', () => {
    //     expect(updateTheme(containerPadding1, containerPadding2)).toEqual(containerPadding2);
    // });
});
//# sourceMappingURL=combineStyles.spec.js.map