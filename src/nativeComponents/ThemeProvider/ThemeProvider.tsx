import { createMuiTheme, MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
// @ts-ignore
import JssProvider from 'react-jss/lib/JssProvider';
import * as React from 'react';
import { appTheme } from '../..';
import { getMuiTheme } from '../../utils/web';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
});

export class ThemeProvider extends React.PureComponent<{}, {}> {
    private theme: any;
    constructor(props: {}) {
        super(props);
        this.theme = createMuiTheme(getMuiTheme(appTheme));
    }
    render() {
        const {children} = this.props;
        return (
            <JssProvider generateClassName={generateClassName}>
                <MuiThemeProvider theme={this.theme}>
                    {children}
                </MuiThemeProvider>
            </JssProvider>
        );
    }
}