import * as React from 'react';
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import {getMuiTheme} from "../../utils/web";
import {appTheme} from "../..";


export const ThemeProvider: React.StatelessComponent<{}> = ({children}) => (
    <MuiThemeProvider theme={createMuiTheme(getMuiTheme(appTheme))}>
        {children}
    </MuiThemeProvider>
);
