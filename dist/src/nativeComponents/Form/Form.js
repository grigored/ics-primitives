"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
var enums_1 = require("../../utils/enums");
var TextInput_1 = require("./TextInput/TextInput");
var styles = {
    formContainer: {
        flexDirection: 'column'
    },
};
var CForm = function (_a) {
    var classes = _a.classes, containerStyle = _a.containerStyle, fields = _a.fields, getFieldComponent = _a.getFieldComponent;
    return (React.createElement(__1.View, { style: [classes.formContainer, containerStyle] }, fields.map(function (_a) {
        var name = _a.name, type = _a.type, other = __rest(_a, ["name", "type"]);
        var component;
        switch (type) {
            case enums_1.FORM_INPUT_TYPES.TEXT:
                component = TextInput_1.TextInput;
            default:
                component = TextInput_1.TextInput;
        }
        return getFieldComponent(name, component, other);
    })));
};
exports.Form = __1.createStyles(styles, "Form", CForm);
//# sourceMappingURL=Form.js.map