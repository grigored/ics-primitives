/// <reference types="react" />
import * as React from 'react';
import { WithStyles } from 'material-ui/styles';
import { StyleRules } from './createStyles.types';
export declare function createStyles<T>(styles: StyleRules, componentName: string, WrappedComponent: React.ComponentType<T & WithStyles>, name?: string): React.ComponentType<T>;
