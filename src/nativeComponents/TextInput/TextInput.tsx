import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { TEXT_INPUT_TYPES } from '../../utils/enums';
import { TextInputProps } from './TextInput.types';


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


export const TextInput = ( {
                               value,
                               onChange,
                               placeholder,
                               inputType,
                               onBlur,
                               onFocus,
                               title,
                               error,
                               id,
                               multiline
                           }: TextInputProps ) => (
    <FormControl fullWidth>
        <TextField
            id={id}
            value={value || ''}
            error={!!error}
            multiline={multiline}
            placeholder={placeholder || ''}
            label={title || ''}
            type={getKeyboardType(inputType)}
            onChange={onChange}
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