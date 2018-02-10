import { StyleSheet } from 'react-native';
import { createStylesGeneric } from "./utils";
export function createStyles(styles, componentName, WrappedComponent) {
    return createStylesGeneric(styles, componentName, WrappedComponent, StyleSheet.create);
}
//# sourceMappingURL=createStyles.native.js.map