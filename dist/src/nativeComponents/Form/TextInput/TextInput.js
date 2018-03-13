var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import TextField from 'material-ui/TextField';
import { FormHelperText } from "material-ui";
import { FormControl } from 'material-ui/Form';
import { TEXT_INPUT_TYPES } from 'src/utils/enums';
export var INVALID_JSON_STRING = 'Invalid JSON string';
export var FIELD_MUST_BE_NUMBER = 'Field must be a number';
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
var getError = function (textInputType, rawValue) {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            if (rawValue.indexOf('.') !== -1) {
                return FIELD_MUST_BE_NUMBER;
            }
            return rawValue !== '' && isNaN(+rawValue) ? FIELD_MUST_BE_NUMBER : undefined;
        case TEXT_INPUT_TYPES.FLOAT:
            return rawValue !== '' && isNaN(+rawValue) ? FIELD_MUST_BE_NUMBER : undefined;
        case TEXT_INPUT_TYPES.JSON:
            try {
                JSON.parse(rawValue || '');
                break;
            }
            catch (err) {
                return INVALID_JSON_STRING;
            }
    }
    return undefined;
};
var db2raw = function (textInputType, dbValue) {
    if (!dbValue) {
        return '';
    }
    switch (textInputType) {
        case TEXT_INPUT_TYPES.JSON:
            return JSON.stringify(dbValue, null, 2);
        default:
            return dbValue.toString();
    }
};
var parseValue = function (textInputType, value) {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            return parseInt(value);
        case TEXT_INPUT_TYPES.FLOAT:
            return parseFloat(value);
        case TEXT_INPUT_TYPES.JSON:
            try {
                return JSON.parse(value || '');
            }
            catch (err) {
                return {};
            }
        default:
            return value;
    }
};
var CTextInput = /** @class */ (function (_super) {
    __extends(CTextInput, _super);
    function CTextInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CTextInput.prototype.componentWillMount = function () {
        var _a = this.props, input = _a.input, _b = _a.inputType, inputType = _b === void 0 ? TEXT_INPUT_TYPES.TEXT : _b;
        if (input && input.value !== null && input.value !== undefined) {
            this.setState({ rawValue: db2raw(inputType, input.value) });
        }
        else {
            this.setState({ rawValue: '' });
        }
    };
    CTextInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, placeholder = _a.placeholder, _b = _a.inputType, inputType = _b === void 0 ? TEXT_INPUT_TYPES.TEXT : _b, onBlur = _a.onBlur, title = _a.title, error = _a.error, id = _a.id, multiline = _a.multiline, input = _a.input;
        return (React.createElement(FormControl, { fullWidth: true },
            React.createElement(TextField, { id: id, value: input.value || '', error: !!error, multiline: multiline, placeholder: placeholder || '', label: title || '', type: getKeyboardType(inputType), onChange: function (ev) {
                    var rawValue = ev.target.value;
                    var dbValue = parseValue(inputType, rawValue);
                    _this.setState({ rawValue: rawValue });
                    var fieldError = getError(inputType, rawValue);
                    !!input.onChange && input.onChange(!!fieldError
                        ? { value: dbValue, error: fieldError }
                        : dbValue);
                }, onBlur: function () {
                    onBlur && onBlur();
                }, helperText: error }),
            false && React.createElement(FormHelperText, null, "some helping text here")));
    };
    return CTextInput;
}(React.PureComponent));
export { CTextInput };
export var TextInput = CTextInput;
//# sourceMappingURL=TextInput.js.map