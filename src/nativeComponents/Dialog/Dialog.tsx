import * as React from "react";
import MaterialDialog from 'material-ui/Dialog';
import Fade, { FadeProps } from 'material-ui/transitions/Fade';

function Transition(props: FadeProps) {
    return <Fade {...props} timeout={{enter: 400, exit: 500}}/>;
}

export interface BodyProps {
    displayTopbar?: boolean,
    nonUrlProps?: any,
    urlProps?: any,
    hideDialog?: Function,
}

export interface Props {
    body: React.ComponentType<BodyProps>,
    fullScreen: boolean,
    visible: boolean,
    nonUrlProps?: any,
    urlProps?: any,
    hideDialog: () => void,
}

export class Dialog extends React.PureComponent<Props, {}> {
    private hideDialog: () => void;
    private onExited: () => void;

    constructor(props: Props) {
        super(props);
        this.hideDialog = this.props.hideDialog.bind(this);
        this.onExited = this.props.hideDialog.bind(this);
    }

    render() {
        let { body, fullScreen, visible, nonUrlProps, urlProps } = this.props;
        // noinspection JSUnusedLocalSymbols
        const BodyComponent = body;

        return (
            <MaterialDialog
                open={visible}
                onExited={this.onExited}
                fullScreen={fullScreen}
                transition={Transition}
                onClose={this.hideDialog}
            >
                <BodyComponent
                    displayTopbar={true}
                    nonUrlProps={nonUrlProps}
                    urlProps={urlProps}
                    hideDialog={this.hideDialog}
                />
            </MaterialDialog>
        );
    }
}
