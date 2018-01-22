export type AppTheme = {
    topBarHeight: number,
    primaryColor: string,
    primaryTextColor: string,
    secondaryColor?: string,
    drawerWidth: number,
}

export type CssPropValue = string | number | boolean;

export type ClassValues = {
    [cssProp: string]: CssPropValue,
}

export type StyleRules = {
    [className: string]: ClassValues
};

export type PlatformStyleRules = {
    [className: string]: {
        [cssPropOrPlatform: string]: CssPropValue | {[platform: string]: CssPropValue} | ClassValues,
    },
};

export type StyleSheetClass = number | string; // on native it is a number, on web it is a string

export type StyleSheetClasses = {
    [className: string]: StyleSheetClass
}

export type WithStyles = {
    classes: StyleSheetClasses
}

export type Classes = Object | Array<Object | string | number> | string | number;