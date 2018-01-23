import * as React from "react";
import { getStyleProps } from '../../utils/web';
import { ViewProps } from './View.types';


export class View extends React.PureComponent<ViewProps, {}> {
    render() {
        let {
            children, style, collapsable, accessible, ...otherProps
        } = this.props;
        return (
            <div
                {...getStyleProps(style)}
                {...otherProps}
            >
                {children}
            </div>
        );
    }
}
