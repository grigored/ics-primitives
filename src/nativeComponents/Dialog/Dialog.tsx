import * as React from "react";
import MaterialDialog from 'material-ui/Dialog';
import Fade, { FadeProps } from 'material-ui/transitions/Fade';

function Transition(props: FadeProps) {
    return <Fade {...props} timeout={{enter: 400, exit: 500}}/>;
}

export interface BodyProps {
    displayTopbar?: boolean,
    hideDialog?: Function,
}

export interface Props {
    body: React.ComponentType<BodyProps>,
    fullScreen: boolean,
    visible: boolean,
    props?: any,
    hideDialog: () => void,
    removeDialog: () => void,
}

export class Dialog extends React.PureComponent<Props, {}> {
    private hideDialog: () => void;
    private onExited: () => void;

    constructor(props: Props) {
        super(props);
        this.hideDialog = this.props.hideDialog.bind(this);
        this.onExited = this.props.removeDialog.bind(this);
    }

    render() {
        let { body, fullScreen, visible, props} = this.props;
        // noinspection JSUnusedLocalSymbols
        const BodyComponent: React.ComponentType<BodyProps & {navigation?: {state: {params: {props: any}}}}> = body;

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
                    navigation={{state:{params:{props}}}}
                    hideDialog={this.hideDialog}
                />
            </MaterialDialog>
        );
    }
}
