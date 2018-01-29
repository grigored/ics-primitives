"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Form_1 = require("material-ui/Form");
var TextField_1 = require("material-ui/TextField");
var enums_1 = require("../../../utils/enums");
var getKeyboardType = function (inputType) {
    switch (inputType) {
        case enums_1.TEXT_INPUT_TYPES.PASSWORD:
            return 'password';
        case enums_1.TEXT_INPUT_TYPES.EMAIL:
            return 'email';
        case enums_1.TEXT_INPUT_TYPES.PHONE:
            return 'tel';
        default:
            return 'text';
    }
};
exports.TextInput = function (_a) {
    var placeholder = _a.placeholder, inputType = _a.inputType, onBlur = _a.onBlur, title = _a.title, error = _a.error, id = _a.id, multiline = _a.multiline, input = _a.input;
    return (React.createElement(Form_1.FormControl, { fullWidth: true },
        React.createElement(TextField_1.default, { id: id, value: input.value || '', error: !!error, multiline: multiline, placeholder: placeholder || '', label: title || '', type: getKeyboardType(inputType), onChange: function (ev) {
                return !!input.onChange && input.onChange(ev.target.value);
            }, onBlur: function () {
                onBlur && onBlur();
            }, helperText: error }),
        false && React.createElement(Form_1.FormHelperText, null, "some helping text here")));
};
//# sourceMappingURL=TextInput.js.map