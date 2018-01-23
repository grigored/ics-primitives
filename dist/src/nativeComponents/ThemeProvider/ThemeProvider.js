import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { getMuiTheme, loadRoboto } from "../../utils/web";
import { appTheme } from "../..";
loadRoboto();
export var ThemeProvider = function (_a) {
    var children = _a.children;
    return (React.createElement(MuiThemeProvider, { theme: createMuiTheme(getMuiTheme(appTheme)) }, children));
};
//# sourceMappingURL=ThemeProvider.js.map