import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import { combineStyles } from "../../utils/combineStyles";
import { PlatformStyleRules, WithStyles } from "../../utils/theme.types";

export const createStyles = function<T>(
    styles: PlatformStyleRules | (() => PlatformStyleRules),
    componentName: string,
    WrappedComponent: React.ComponentClass<T & WithStyles> | React.ComponentType<T & WithStyles>,
    name?: string,
): React.ComponentClass<T> {
    // @ts-ignore
    return withStyles(
        () => combineStyles(styles, componentName)
    )(WrappedComponent);
};
