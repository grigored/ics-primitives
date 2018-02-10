import * as React from 'react';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { TEXT_INPUT_TYPES } from '../../../utils/enums';
var getKeyboardType = function (inputType) {
    switch (inputType) {
        case TEXT_INPUT_TYPES.PASSWORD:
            return 'password';
        case TEXT_INPUT_TYPES.EMAIL:
            return 'email';
        case TEXT_INPUT_TYPES.PHONE:
            return 'tel';
        default:
            return 'text';
    }
};
export var TextInput = function (_a) {
    var placeholder = _a.placeholder, inputType = _a.inputType, onBlur = _a.onBlur, title = _a.title, error = _a.error, id = _a.id, multiline = _a.multiline, input = _a.input;
    return (React.createElement(FormControl, { fullWidth: true },
        React.createElement(TextField, { id: id, value: input.value || '', error: !!error, multiline: multiline, placeholder: placeholder || '', label: title || '', type: getKeyboardType(inputType), onChange: function (ev) {
                return !!input.onChange && input.onChange(ev.target.value);
            }, onBlur: function () {
                onBlur && onBlur();
            }, helperText: error }),
        false && React.createElement(FormHelperText, null, "some helping text here")));
};
//# sourceMappingURL=TextInput.js.map