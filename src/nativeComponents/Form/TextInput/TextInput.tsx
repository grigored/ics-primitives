import * as React from 'react';
import {FormControl, FormHelperText} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { TextInputProps } from "./TextInput.types";
import { TEXT_INPUT_TYPES } from '../../../utils/enums';

const getKeyboardType = (inputType?: TEXT_INPUT_TYPES): string => {
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

export const TextInput = ({
    placeholder,
    inputType,
    onBlur,
    title,
    error,
    id,
    multiline,
    input,
}: TextInputProps) => (
    <FormControl fullWidth>
        <TextField
            id={id}
            value={input.value || ''}
            error={!!error}
            multiline={multiline}
            placeholder={placeholder || ''}
            label={title || ''}
            type={getKeyboardType(inputType)}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                !!input.onChange && input.onChange(ev.target.value)
            }
            onBlur={() => {
                onBlur && onBlur();
            }}
            helperText={error}
        />
        {false && <FormHelperText>some helping text here</FormHelperText>}
    </FormControl>
);