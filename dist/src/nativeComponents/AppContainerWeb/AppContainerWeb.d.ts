/// <reference types="react" />
import * as React from 'react';
export interface AppProps {
    drawerContent?: React.ReactNode;
    drawerOpen?: boolean;
    drawerPersistent?: boolean;
    onDrawerClose?: () => void;
}
export declare const AppContainerWeb: React.ComponentType<AppProps>;
