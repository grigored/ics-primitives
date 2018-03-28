import * as React from "react";
import { StyleRules, WithStyles, StyleSheetClasses } from "../../utils/theme.types";
import { hoistNonReactStatics } from "../../lib/hoist-non-react-statics/index";
import {combineStyles } from "../../utils/combineStyles";

/**
 * some method
 * @param {StyleRules | (() => StyleRules)} styles
 * @param {string} componentName
 * @param {React.ComponentType<T & WithStyles>} WrappedComponent
 * @param {(styles: StyleRules) => StyleSheetClasses} StyleSheetCreate
 * @returns {React.ComponentType<T>}
 * @public
 */
export const createStylesGeneric = <T extends {}>(
    styles: StyleRules | (() => StyleRules),
    componentName: string,
    WrappedComponent: React.ComponentType<T & WithStyles>,
    StyleSheetCreate: (styles: StyleRules) => StyleSheetClasses,
): React.ComponentType<T> => {

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

};
