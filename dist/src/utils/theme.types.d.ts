export declare type AppTheme = {
    [cssProp: string]: string | number | {
        [platform: string]: string | number;
    };
};
export declare type ClassValues = {
    [cssProp: string]: string | number;
};
export declare type StyleRules = {
    [className: string]: ClassValues;
};
export declare type PlatformStyleRules = {
    [className: string]: {
        [cssPropOrPlatform: string]: string | number | {
            [platform: string]: string | number;
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
