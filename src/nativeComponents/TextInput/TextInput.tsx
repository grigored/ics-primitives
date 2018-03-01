import * as React from 'react';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { TEXT_INPUT_TYPES } from '../../utils/enums';
import { TextInputDBValue, TextInputProps } from './TextInput.types';
import { parseValue } from './TextInput.utils';


const getKeyboardType = ( inputType: TEXT_INPUT_TYPES ): string => {
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

class CTextInput extends React.PureComponent<TextInputProps & FieldStateProps<TextInputDBValue>, {}> {
    render() {
        const {
            value, onChange, placeholder, inputType, onBlur, onFocus, title, error, id, multiline
        } = this.props;

        return (
            <FormControl fullWidth>
                <TextField
                    id={id}
                    value={(value && value.toString()) || ''}
                    error={!!error}
                    multiline={multiline || inputType === TEXT_INPUT_TYPES.JSON}
                    placeholder={placeholder || ''}
                    label={title || ''}
                    type={getKeyboardType(inputType)}
                    onChange={( event: any ) => {
                        const dbValue = parseValue(inputType, event.target.value);
                        onChange && onChange(dbValue);
                    }}
                    onBlur={() => {
                        onBlur && onBlur();
                    }}
                    onFocus={() => {
                        onFocus && onFocus();
                    }}
                    helperText={error}
                />
                {false && <FormHelperText>some helping text here</FormHelperText>}
            </FormControl>
        );
    }
}

export const TextInput: React.ComponentType<TextInputProps & FieldStateProps<TextInputDBValue>> = CTextInput;
