/// <reference types="react" />
import * as React from "react";
export interface BodyProps {
    displayTopbar?: boolean;
    nonUrlProps?: any;
    urlProps?: any;
    hideDialog?: Function;
}
export interface Props {
    visible: boolean;
    nonUrlProps?: any;
    urlProps?: any;
    hideDialog: () => void;
    body: React.ComponentType<BodyProps>;
}
export declare class Dialog extends React.PureComponent<Props, {}> {
    private hideDialog;
    private onExited;
    constructor(props: Props);
    render(): JSX.Element;
}
