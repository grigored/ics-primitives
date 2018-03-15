import { FormHelperText } from "material-ui";
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import {
    defaultDbToRaw, defaultRawToDb, getError,
    getKeyboardType
} from "src/nativeComponents/TextInput/textInputUtils";
import { TEXT_INPUT_TYPES } from "../../utils/enums";
import { TextInputProps } from "./TextInput.types";

export const INVALID_JSON_STRING = 'Invalid JSON string';
export const FIELD_MUST_BE_NUMBER = 'Field must be a number';


export class CTextInput extends React.PureComponent<TextInputProps, { rawValue: string, }> {
    componentWillMount() {
        let { value, inputType = TEXT_INPUT_TYPES.TEXT, dbToRaw, } = this.props;
        if (value !== null && value !== undefined) {
            this.setState( {
                rawValue: !!dbToRaw
                    ? dbToRaw( value )
                    : defaultDbToRaw( inputType, value )
            } )
        } else {
            this.setState( { rawValue: '' } )
        }
    }

    render() {
        let {
            placeholder,
            inputType = TEXT_INPUT_TYPES.TEXT,
            onBlur,
            title,
            error,
            id,
            multiline,
            onChange,
            rawToDb,
        } = this.props;
        return (
            <FormControl fullWidth>
                <TextField
                    id={id}
                    value={this.state.rawValue || ''}
                    error={!!error}
                    multiline={multiline}
                    placeholder={placeholder || ''}
                    label={title || ''}
                    type={getKeyboardType( inputType )}
                    onChange={( ev: React.ChangeEvent<HTMLInputElement> ) => {
                        let rawValue = ev.target.value;
                        let dbValue = !!rawToDb
                            ? rawToDb( rawValue )
                            : defaultRawToDb( inputType, rawValue );
                        this.setState( { rawValue: rawValue } );
                        let fieldError = getError( inputType, rawValue );
                        !!onChange && onChange(
                            !!fieldError
                                ? { value: dbValue, error: fieldError }
                                : dbValue
                        )
                    }}
                    onBlur={() => {
                        onBlur && onBlur();
                    }}
                    helperText={error}
                />
                {false && <FormHelperText>some helping text here</FormHelperText>}
            </FormControl>
        );
    }
}

export const TextInput = CTextInput;