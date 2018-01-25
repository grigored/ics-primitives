var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { View } from '../..';
import { FORM_INPUT_TYPES } from "../../utils/enums";
import { TextInput } from "./TextInput/TextInput";
export var Form = function (_a) {
    var fieldDefinitions = _a.fieldDefinitions, getFieldComponent = _a.getFieldComponent;
    return (React.createElement(View, null, fieldDefinitions.map(function (_a) {
        var name = _a.name, type = _a.type, other = __rest(_a, ["name", "type"]);
        var component;
        switch (type) {
            case FORM_INPUT_TYPES.TEXT:
                component = TextInput;
            default:
                component = TextInput;
        }
        return getFieldComponent(name, component, other);
    })));
};
//# sourceMappingURL=Form.js.map