import * as React from 'react';
import {createMuiTheme, MuiThemeProvider} from "material-ui/styles";
import {getMuiTheme, loadRoboto} from "../../utils/web";
import {appTheme} from "../..";

loadRoboto();

export const ThemeProvider: React.StatelessComponent<{}> = ({children}) => (
    <MuiThemeProvider theme={createMuiTheme(getMuiTheme(appTheme))}>
        {children}
    </MuiThemeProvider>
);
