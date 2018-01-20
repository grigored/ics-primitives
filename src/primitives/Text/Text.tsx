import * as React from "react";

export interface Props {
    key?: string | number;
    children?: any;
    style?: any;
    id?: string;
    classes?: any,
    onPress?: () => void;
    ellipsizeMode?: string,
    numberOfLines?: number,
}

export const Text = ({classes, children, style, onPress}: Props) => (
    <div
        onClick={onPress && ((event) => {
            event.preventDefault();
            onPress();
        })}
    >
        {children}
    </div>
);

