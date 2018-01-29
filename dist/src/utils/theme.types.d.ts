export declare type AppTheme = {
    topBarHeight: number;
    primaryColor: string;
    primaryTextColor: string;
    backgroundColor: string;
    textColor: string;
    secondaryColor?: string;
    drawerWidth: number;
    horizontalMargin: number;
    fontSizeS: number;
    fontSizeM: number;
    fontSizeL: number;
    fontSizeXL: number;
    spacingXS: number;
    spacingS: number;
    spacingM: number;
    spacingL: number;
    spacingXL: number;
};
export declare type CssPropValue = string | number | boolean | Object;
export declare type ClassValues = {
    [cssProp: string]: CssPropValue;
};
export declare type StyleRules = {
    [className: string]: ClassValues;
};
export declare type PlatformClassValues = {
    [cssPropOrPlatform: string]: CssPropValue | {
        [platform: string]: CssPropValue;
    } | ClassValues;
};
export declare type PlatformStyleRules = {
    [className: string]: PlatformClassValues;
};
export declare type StyleSheetClass = number | string;
export declare type StyleSheetClasses = {
    [className: string]: StyleSheetClass;
};
export declare type WithStyles = {
    classes: StyleSheetClasses;
};
export declare type Classes = Object | Array<Object | string | number> | string | number;
