import {AppTheme, PlatformStyleRules} from "./theme.types";

export const XS_BREAKING_POINT = 768;

export const all = 'all';
export const android = 'android';
export const ios = 'ios';
export const native = 'native';
export const web = 'web';
export const webMobile = 'webMobile';
export const webDesktop = 'webDesktop';

export const appTheme: AppTheme = {
    topBarHeight: 64,
    drawerWidth: 250,
    primaryColor: '#000',
    primaryTextColor: '#fff',
    backgroundColor: '#fff',
    textColor: '#000',
    placeholderColor: '#555',
    cursorColor: '#000',
    errorColor: '#f44336',
    horizontalMargin: 16,
    defaultVerticalMargin: 8,
    inputHeight: 28,
    // inputHeight: {
    //     [ios]: 28,
    // },
    fontSizeS: 12,
    fontSizeM: 14,
    fontSizeL: 18,
    fontSizeXL: 24,
    spacingXS: 2,
    spacingS: 4,
    spacingM: 8,
    spacingL: 16,
    spacingXL: 32,
};

export const runTimeClasses = {

};

export const defaultClasses: PlatformStyleRules = {
    paper: {
        [web]: {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        },
        [all]: {
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 2
            },

            shadowRadius: 4,
            shadowOpacity: 1.0
        }
    }
};
