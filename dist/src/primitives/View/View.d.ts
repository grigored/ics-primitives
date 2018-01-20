/// <reference types="react" />
import * as React from "react";
export interface ViewStyle {
}
export interface Props {
    accessible?: boolean;
    children?: React.ReactNode;
    collapsable?: boolean;
    dangerouslySetInnerHTML?: {
        __html: string;
    };
    id?: string;
    key?: string | number;
    onClick?: () => void;
    style?: ViewStyle;
}
export declare class View extends React.PureComponent<Props, {}> {
    render(): JSX.Element;
}
