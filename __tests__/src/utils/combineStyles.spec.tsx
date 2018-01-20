import { removePlatform } from 'src/utils/combineStyles';
import {all, ios, native, web} from 'src/utils/theme';
import {isWeb, isIOS, isAndroid} from 'src/primitives/platform/platform';
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


describe('getStyles', () => {
    it('extracts the right styles according to the platform when platform name is before classname', () => {
        const theme = {
            container: {
                padding: {
                    [web]: 1,
                    [ios]: 2,
                    [all]: 3,
                },
                margin: 1,
            },
        };
        isWeb && expect(removePlatform(theme)).toEqual({container: {padding: 1, margin: 1}});
        isIOS && expect(removePlatform(theme)).toEqual({container: {padding: 2, margin: 1}});
        isAndroid && expect(removePlatform(theme)).toEqual({container: {padding: 3, margin: 1}});
    });

    it('extracts the right styles according to the platform when platform name is inside the class definition', () => {
        const theme = {
            container: {
                [web]: {
                    padding: 1,
                },
                [ios]: {
                    padding: 2,
                },
                [all]: {
                    padding: 3,
                },
                [native]: {
                    padding: 4,
                },
                margin: 1,
            },
        };
        isWeb && expect(removePlatform(theme)).toEqual({container: {padding: 1, margin: 1}});
        isIOS && expect(removePlatform(theme)).toEqual({container: {padding: 2, margin: 1}});
        isAndroid && expect(removePlatform(theme)).toEqual({container: {padding: 4, margin: 1}});
    });


    test('media queries are returned on web, but not on native', () => {
       const theme = {
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
