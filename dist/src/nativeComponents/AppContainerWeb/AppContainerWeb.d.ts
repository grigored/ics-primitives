/// <reference types="react" />
import * as React from 'react';
import { TopbarListButtonData, TopbarSimpleButtonData } from "../Topbar/Topbar.types";
export interface AppProps {
    drawerContent?: React.ReactNode;
    drawerOpen?: boolean;
    drawerPersistent?: boolean;
    onDrawerClose?: () => void;
    rightButtonsData?: Array<TopbarSimpleButtonData | TopbarListButtonData>;
    title?: React.ReactNode | string;
}
export declare const AppContainerWeb: React.ComponentType<AppProps>;
