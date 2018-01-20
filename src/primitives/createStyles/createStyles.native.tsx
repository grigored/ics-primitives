import * as React from "react";
import {StyleSheet} from 'react-native';
import { StyleRules, WithStyles } from "../../utils/theme.types";
import {createStylesGeneric} from "./utils";


export function createStyles<T>(
    styles: StyleRules | (() => StyleRules),
    componentName: string,
    WrappedComponent: React.ComponentType<T & WithStyles>,
): React.ComponentType<T> {
    return createStylesGeneric(styles, componentName, WrappedComponent, StyleSheet.create);

}