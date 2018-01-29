/// <reference types="react" />
import * as React from "react";
export interface BodyProps {
    displayTopbar?: boolean;
    nonUrlProps?: any;
    urlProps?: any;
    hideDialog?: Function;
}
export interface Props {
    body: React.ComponentType<BodyProps>;
    fullScreen: boolean;
    visible: boolean;
    nonUrlProps?: any;
    urlProps?: any;
    hideDialog: () => void;
}
export declare class Dialog extends React.PureComponent<Props, {}> {
    private hideDialog;
    private onExited;
    constructor(props: Props);
    render(): JSX.Element;
}
