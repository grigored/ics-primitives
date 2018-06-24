import * as React from 'react';
import { connect } from 'react-redux';
import { Snackbar as MaterialSnackbar } from '@material-ui/core';
import { hideSnackbar, removeSnackbar, Snack } from '../../redux/reducers/dialog';

export interface OwnProps {

}

interface ConnectedProps {
    messages: Array<Snack>
    hideSnackbar: typeof hideSnackbar
    removeSnackbar: typeof removeSnackbar
}

type AllProps = OwnProps & ConnectedProps

class CSnackbar extends React.PureComponent<AllProps, {open: boolean}> {

    render() {
        const {messages, hideSnackbar, removeSnackbar} = this.props;

        return (
            messages.map(snack =>
                <MaterialSnackbar
                    key={snack.id}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={snack.open}
                    autoHideDuration={3000}
                    onClose={hideSnackbar.bind(this, snack.id)}
                    onExited={removeSnackbar.bind(this, snack.id)}
                    message={<span id="message-id">{snack.message}</span>}
                    action={[]}
                />
            )
        );
    }
}

export const Snackbar: React.ComponentType<OwnProps> = connect(
    ( state: any, ownProps: OwnProps ) => ({
        messages: state.dialog.snackbarMessages,
    }),
    {
        hideSnackbar,
        removeSnackbar,
    }
)(CSnackbar);
