import * as React from "react";
import { StyleRules, WithStyles, StyleSheetClasses } from "../../utils/theme.types";
import { hoistNonReactStatics } from "../../lib/hoist-non-react-statics";
import {combineStyles } from "../../utils/combineStyles";


export function createStylesGeneric<T>(
    styles: StyleRules | (() => StyleRules),
    componentName: string,
    WrappedComponent: React.ComponentType<T & WithStyles>,
    StyleSheetCreate: (styles: StyleRules) => StyleSheetClasses,
): React.ComponentType<T> {

    class Enhance extends React.Component<T & {classes: any}> {

        render() {
            return (
                <WrappedComponent
                    classes={StyleSheetCreate(combineStyles(styles, componentName))}
                    {...this.props}
                />
            );
        }
    }

    // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
    hoistNonReactStatics(Enhance, WrappedComponent);
    return Enhance;

}
