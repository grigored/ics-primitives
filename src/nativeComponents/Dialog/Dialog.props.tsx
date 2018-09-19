import * as React from 'react';
import { DialogData, hideDialog, removeDialog } from '../../redux/reducers/navigation';

export interface BodyProps {
    displayTopbar?: boolean,
}

export interface Props {
    id: string,
    body: React.ComponentType<BodyProps | any>,
    fullScreen: boolean,
    props?: any,
    disableBackdropClick?: boolean,
    disableEscapeKeyDown?: boolean,

}

export interface ConnectedProps {
    dialogs: Array<DialogData>,

    hideDialog: typeof hideDialog,
    removeDialog: typeof removeDialog,
}

export type AllProps = Props & ConnectedProps;
