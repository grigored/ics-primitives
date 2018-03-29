import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import { appTheme } from '../..';
import { getMuiTheme } from '../../utils/web';

export class ThemeProvider extends React.PureComponent<{}, {}> {
    private theme: any;
    constructor(props: {}) {
        super(props);
        this.theme = createMuiTheme(getMuiTheme(appTheme));
    }
    render() {
        const {children} = this.props;
        return (
            <MuiThemeProvider theme={this.theme}>
                {children}
            </MuiThemeProvider>
        );
    }
}