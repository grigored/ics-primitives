/// <reference types="react" />
import * as React from "react";
import { StyleRules, WithStyles } from "../../utils/theme.types";
export declare function createStyles<T>(styles: StyleRules | (() => StyleRules), componentName: string, WrappedComponent: React.ComponentType<T & WithStyles>): React.ComponentType<T>;
