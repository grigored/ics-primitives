import * as React from "react";
import MaterialDialog from 'material-ui/Dialog';
import Fade, { FadeProps } from 'material-ui/transitions/Fade';
import { connect } from 'react-redux';
import { DialogData, hideDialog, removeDialog } from '../../redux/reducers/navigation';
import { AllProps, BodyProps, Props } from './Dialog.props';

function Transition(props: FadeProps) {
    return <Fade {...props} timeout={{enter: 400, exit: 500}}/>;
}

class CDialog extends React.PureComponent<AllProps, {}> {
    private hideDialog: () => void;
    private onExited: () => void;

    constructor(props: AllProps) {
        super(props);
        this.hideDialog = this.props.hideDialog.bind(this, props.id);
        this.onExited = this.props.removeDialog.bind(this, props.id);
    }

    render() {
        const { body, fullScreen, id, props, dialogs} = this.props;
        let dialog: null | DialogData = null;

        for (let ldialog of dialogs) {
            if (ldialog.id === id) {
                dialog = ldialog;
                break
            }
        }

        if (!dialog) {
            return null;
        }

        // noinspection JSUnusedLocalSymbols
        const BodyComponent: React.ComponentType<BodyProps & {navigation?: {state: {params: any}}}> = body;

        return (
            <MaterialDialog
                open={dialog.visible || false}
                onExited={this.onExited}
                fullScreen={fullScreen}
                transition={Transition}
                onClose={this.hideDialog}
            >
                <BodyComponent
                    displayTopbar={true}
                    navigation={{state:{params: props}}}
                />
            </MaterialDialog>
        );
    }
}
export const Dialog: React.ComponentType<Props> = connect(
    ( state: any, ownProps: Props ) => ({
        dialogs: state.navigation.dialogs,
    }),
    {
        hideDialog,
        removeDialog,
    }
)(CDialog);
