/// <reference types="react" />
import * as React from 'react';
export interface DrawerProps {
    persistent?: boolean;
    open?: boolean;
    onDrawerClose?: () => void;
}
export declare const DrawerWeb: React.ComponentType<DrawerProps>;
