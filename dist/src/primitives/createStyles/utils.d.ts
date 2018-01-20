/// <reference types="react" />
import * as React from "react";
import { StyleRules, WithStyles, StyleSheetClasses } from "../../utils/theme.types";
export declare function createStylesGeneric<T>(styles: StyleRules | (() => StyleRules), componentName: string, WrappedComponent: React.ComponentType<T & WithStyles>, StyleSheetCreate: (styles: StyleRules) => StyleSheetClasses): React.ComponentType<T>;
