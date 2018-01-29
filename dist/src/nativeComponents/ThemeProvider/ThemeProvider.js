import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { getMuiTheme } from "../../utils/web";
import { appTheme } from "../..";
export var ThemeProvider = function (_a) {
    var children = _a.children;
    return (React.createElement(MuiThemeProvider, { theme: createMuiTheme(getMuiTheme(appTheme)) }, children));
};
//# sourceMappingURL=ThemeProvider.js.map