import { createMuiTheme, MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { GenerateClassName } from "jss";
// @ts-ignore
import JssProvider from 'react-jss/lib/JssProvider';
import * as React from 'react';
import { appTheme } from '../..';
import { getMuiTheme } from '../../utils/web';

export interface OwnProps {
    dangerouslyUseGlobalCSS?: boolean,
}

export class ThemeProvider extends React.PureComponent<OwnProps, {}> {
    private theme: any;
    private generateClassName?: GenerateClassName<any>;

    constructor(props: OwnProps) {
        super(props);
        this.theme = createMuiTheme(getMuiTheme(appTheme));
        this.generateClassName = props.dangerouslyUseGlobalCSS
            ? createGenerateClassName({dangerouslyUseGlobalCSS: true})
            : undefined;
    }
    render() {
        const {children} = this.props;
        return (
            <JssProvider generateClassName={this.generateClassName}>
                <MuiThemeProvider theme={this.theme}>
                    {children}
                </MuiThemeProvider>
            </JssProvider>
        );
    }
}