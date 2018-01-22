/// <reference types="react" />
import * as React from 'react';
import { PlatformStyleRules, WithStyles } from "../../utils/theme.types";
export declare const createStyles: <T>(styles: PlatformStyleRules | (() => PlatformStyleRules), componentName: string, WrappedComponent: React.ComponentType<T & WithStyles>, name?: string | undefined) => React.ComponentType<T>;
