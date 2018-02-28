"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
var theme_1 = require("../../utils/theme");
var styles = {
    elevation: (_a = {},
        _a[theme_1.web] = {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        },
        _a[theme_1.all] = {
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
    return (React.createElement(__1.View, { name: name, style: [classes.elevation, style] }, children));
};
exports.Paper = __1.createStyles(styles, 'Paper', CPaper);
var _a;
//# sourceMappingURL=Paper.js.map