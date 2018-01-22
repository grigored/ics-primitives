import { StyleSheet } from 'react-sketchapp';
import { createStylesGeneric } from "./utils";
export function createStyles(styles, componentName, WrappedComponent) {
    return createStylesGeneric(styles, componentName, WrappedComponent, StyleSheet.create);
}
//# sourceMappingURL=createStyles.sketch.js.map