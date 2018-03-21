import { withStyles } from 'material-ui/styles';
import { combineStyles } from '../../utils/combineStyles';
import { PlatformStyleRules } from '../../utils/theme.types';
import { returnType } from './createStyles.types';

export const createStyles = ( styles: PlatformStyleRules | (() => PlatformStyleRules),
                              componentName: string, ): returnType => {
    // @ts-ignore
    return WrappedComponent => {
        return withStyles(
            () => combineStyles(styles, componentName)
        )(WrappedComponent);
    }
};
