/// <reference types="react" />
import * as React from 'react';
import { StyleRules, WithStyles } from "../../utils/theme.types";
export declare const createStyles: <T>(styles: StyleRules, componentName: string, WrappedComponent: React.ComponentType<T & WithStyles>, name?: string | undefined) => React.ComponentType<T>;
