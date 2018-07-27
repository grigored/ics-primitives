import { combineStyles } from '../../utils/combineStyles';
import { PlatformStyleRules } from '../../utils/theme.types';
import { returnType } from './createStyles.types';
import { withStyles } from "@material-ui/core";

export const createStyles = ( styles: PlatformStyleRules | (() => PlatformStyleRules),
                              componentName: string, ): returnType => {
    // @ts-ignore
    return WrappedComponent => {
        return (withStyles as any)(
            () => combineStyles(styles, componentName),
            { name: componentName }
        )(WrappedComponent);
    }
};
