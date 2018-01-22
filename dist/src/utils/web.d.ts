import { AppTheme, Classes } from "./theme.types";
export declare function getStyleProps(style?: Classes): {
    style: {
        display: string;
        fontFamily: string;
    };
    className: string;
} | {
    style: {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: string): boolean;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: string): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        display: string;
        fontFamily: string;
    };
};
export declare function getMuiTheme(appTheme: AppTheme): {
    palette: {
        primary: any;
        secondary: any;
    };
};
