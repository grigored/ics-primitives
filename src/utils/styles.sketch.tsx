import {Classes} from "./theme.types";
import {getStyleProps} from "./web";
import {StyleSheet} from 'react-sketchapp';

export const getSketchStyleProps = (style?: Classes) => {
    const combinedStyle = getStyleProps(style);
    const x = {
        style: StyleSheet.flatten([
            combinedStyle.style,
            ...((combinedStyle.className || '').split(' ').map(className => parseInt(className)))
        ].filter(style => !!style))
    };
    console.log('StyleSheet1:', x);
    return x;
};
