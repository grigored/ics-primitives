import * as React from "react";
import { getStyleProps } from '../../utils/web';

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
    <span
        {...getStyleProps(style)}
        onClick={onPress && ((event) => {
            event.preventDefault();
            onPress();
        })}
    >
        {children}
    </span>
);
