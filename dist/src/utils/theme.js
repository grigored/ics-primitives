"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XS_BREAKING_POINT = 768;
exports.all = 'all';
exports.android = 'android';
exports.ios = 'ios';
exports.native = 'native';
exports.web = 'web';
exports.webMobile = 'webMobile';
exports.webDesktop = 'webDesktop';
exports.appTheme = {
    topBarHeight: 64,
    drawerWidth: 250,
    primaryColor: '#000',
    primaryTextColor: '#fff',
    backgroundColor: '#fff',
    textColor: '#000',
    horizontalMargin: 16,
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
exports.runTimeClasses = {};
exports.defaultClasses = {
    paper: (_a = {},
        _a[exports.web] = {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        },
        _a[exports.all] = {
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowRadius: 4,
            shadowOpacity: 1.0
        },
        _a)
};
var _a;
//# sourceMappingURL=theme.js.map