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
//# sourceMappingURL=combineStyles.spec.js.map