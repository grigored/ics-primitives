import * as React from 'react';

export interface TopbarSimpleButtonData {
    title?: string,
    icon?: any,
    onPress?: () => void,
    href?: string,
    selected?: boolean,
}

export interface TopbarListButtonData {
    title?: string,
    items: Array<TopbarSimpleButtonData>
}

export interface TopbarProps {
    leftButtonIcon?: any,
    leftButtonOnPress?: () => void,
    title: React.ReactNode | string,
    rightButtonsData?: Array<TopbarSimpleButtonData | TopbarListButtonData>,
    drawerOpen?: boolean
    topbarContent?: Array<any>
    disableGutters?: boolean,
}
