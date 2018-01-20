/// <reference types="react" />
export interface Props {
    key?: string | number;
    children?: any;
    style?: any;
    id?: string;
    classes?: any;
    onPress?: () => void;
    ellipsizeMode?: string;
    numberOfLines?: number;
}
export declare const Text: ({classes, children, style, onPress}: Props) => JSX.Element;
