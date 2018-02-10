import * as React from 'react';
import { createStyles, View } from "../..";
import { all, web } from "../../utils/theme";
var styles = {
    elevation: (_a = {},
        _a[web] = {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        },
        _a[all] = {
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowRadius: 4,
            shadowOpacity: 1.0
        },
        _a),
};
var CPaper = function (_a) {
    var children = _a.children, classes = _a.classes, style = _a.style, name = _a.name;
    return (React.createElement(View, { name: name, style: [classes.elevation, style] }, children));
};
export var Paper = createStyles(styles, 'Paper', CPaper);
var _a;
//# sourceMappingURL=Paper.js.map