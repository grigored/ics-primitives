import * as React from "react";
import { getStyleProps } from '../../utils/web';
import { ViewProps } from './View.types';

/**
 * Class description and examples here <a id="asd" data-path="src/primitives/View" href="#asd">#asd</a>
 * @class View
 */
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
