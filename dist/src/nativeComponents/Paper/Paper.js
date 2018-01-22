import * as React from 'react';
import { createStyles, View } from "../../index";
;
var styles = {
    paper: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    }
};
var CPaper = function (_a) {
    var children = _a.children, classes = _a.classes;
    return (React.createElement(View, { style: classes.paper }, children));
};
export var Paper = createStyles(styles, 'Paper', CPaper);
//# sourceMappingURL=Paper.js.map