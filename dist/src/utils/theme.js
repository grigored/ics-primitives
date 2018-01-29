export var XS_BREAKING_POINT = 768;
export var all = 'all';
export var android = 'android';
export var ios = 'ios';
export var native = 'native';
export var web = 'web';
export var webMobile = 'webMobile';
export var webDesktop = 'webDesktop';
export var appTheme = {
    topBarHeight: 64,
    drawerWidth: 250,
    primaryColor: '#000',
    primaryTextColor: '#fff',
    backgroundColor: '#fff',
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
export var runTimeClasses = {};
export var defaultClasses = {
    paper: (_a = {},
        _a[web] = {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        },
        _a[all] = {
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