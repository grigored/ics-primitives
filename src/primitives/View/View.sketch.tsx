import * as React from 'react';
import {ViewProps} from './View.types';
import {View as ViewSketch} from 'react-sketchapp';
import {getSketchStyleProps} from "../../utils/styles.sketch";

export class View extends React.PureComponent<ViewProps, {}> {
    render() {
        let {
            children, style, collapsable, accessible, ...otherProps
        } = this.props;
        return (
            <ViewSketch
                {...getSketchStyleProps(style) as {}}
                {...otherProps}
            >
                {children}
            </ViewSketch>
        );
    }
}
