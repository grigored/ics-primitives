export type AppTheme = {
    topBarHeight: number,
    primaryColor: string,
    primaryTextColor: string,
    backgroundColor: string,
    textColor: string,
    secondaryColor?: string,
    drawerWidth: number,
    horizontalMargin: number,
    fontSizeS: number,
    fontSizeM: number,
    fontSizeL: number,
    fontSizeXL: number,
    spacingXS: number,
    spacingS: number,
    spacingM: number,
    spacingL: number,
    spacingXL: number,
}

export type CssPropValue =
    | string
    | number
    | boolean // in case we do something like {margin: web && 5}
    | Object; // on native shadowOffset: {width: 0, height: 2},

export type ClassValues = {
    [cssProp: string]: CssPropValue,
}

export type StyleRules = {
    [className: string]: ClassValues
};

export type PlatformClassValues = {
    [cssPropOrPlatform: string]: CssPropValue | {[platform: string]: CssPropValue} | ClassValues,
}

export type PlatformStyleRules = {
    [className: string]: PlatformClassValues,
};

export type StyleSheetClass = number | string; // on native it is a number, on web it is a string

export type StyleSheetClasses = {
    [className: string]: StyleSheetClass
}

export type WithStyles = {
    classes: StyleSheetClasses
}

export type Classes = Object | Array<Object | string | number> | string | number;