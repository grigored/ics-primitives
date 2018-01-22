export declare type AppTheme = {
    topBarHeight: number;
    primaryColor: string;
    primaryTextColor: string;
    secondaryColor?: string;
    drawerWidth: number;
};
export declare type CssPropValue = string | number | boolean;
export declare type ClassValues = {
    [cssProp: string]: CssPropValue;
};
export declare type StyleRules = {
    [className: string]: ClassValues;
};
export declare type PlatformStyleRules = {
    [className: string]: {
        [cssPropOrPlatform: string]: CssPropValue | {
            [platform: string]: CssPropValue;
        } | ClassValues;
    };
};
export declare type StyleSheetClass = number | string;
export declare type StyleSheetClasses = {
    [className: string]: StyleSheetClass;
};
export declare type WithStyles = {
    classes: StyleSheetClasses;
};
export declare type Classes = Object | Array<Object | string | number> | string | number;
