import * as React from "react";
import {getSketchStyleProps} from "../../utils/styles.sketch";
import {Text as TextSketch} from 'react-sketchapp';

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
    <TextSketch
        {...getSketchStyleProps(style) as {}}
    >
        {children}
    </TextSketch>
);

// export { Text } from 'react-sketchapp';