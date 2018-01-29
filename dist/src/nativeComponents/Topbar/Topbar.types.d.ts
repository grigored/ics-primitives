/// <reference types="react" />
import { ReactNode } from 'react';
export interface TopbarSimpleButtonData {
    title?: string;
    icon?: string;
    onPress?: () => void;
    href?: string;
    selected?: boolean;
}
export interface TopbarListButtonData {
    title?: string;
    items: Array<TopbarSimpleButtonData>;
}
export interface TopbarProps {
    leftButtonIcon?: any;
    leftButtonOnPress?: () => void;
    title: ReactNode | string;
    rightButtonsData?: Array<TopbarSimpleButtonData | TopbarListButtonData>;
    drawerOpen?: boolean;
}
