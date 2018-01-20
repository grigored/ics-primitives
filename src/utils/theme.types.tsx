export type AppTheme = {
    [cssProp: string]: string | number | {[platform: string]: string | number}
}

export type ClassValues = {
    [cssProp: string]: string | number
}

export type StyleRules = {
    [className: string]: ClassValues
};

export type PlatformStyleRules = {
    [className: string]: {
        [cssPropOrPlatform: string]: string | number | {[platform: string]: string | number} | ClassValues,
    },
};

export type StyleSheetClass = number | string; // on native it is a number, on web it is a string

export type StyleSheetClasses = {
    [className: string]: StyleSheetClass
}

export type WithStyles = {
    classes: StyleSheetClasses
}