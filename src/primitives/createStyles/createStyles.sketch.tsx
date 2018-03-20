import { StyleSheet } from 'react-sketchapp';
import { StyleRules } from '../../utils/theme.types';
import { returnType } from './createStyles.types';
import { createStylesGeneric } from './utils';


export function createStyles( styles: StyleRules | (() => StyleRules),
                              componentName: string, ): returnType {
    // @ts-ignore
    return WrappedComponent => createStylesGeneric(styles, componentName, WrappedComponent, StyleSheet.create);
}
