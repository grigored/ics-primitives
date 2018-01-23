import { AppTheme } from "./theme.types";
export declare const getStyleProps: (style?: string | number | Object | (string | number | Object)[] | undefined) => {
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
export declare const getMuiTheme: (appTheme: AppTheme) => {
    palette: {
        primary: any;
        secondary: any;
    };
};
export declare const loadRoboto: () => void;
