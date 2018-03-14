import { FormHelperText } from "material-ui";
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { TEXT_INPUT_TYPES } from "../../utils/enums";
import { TextInputProps } from "./TextInput.types";

export const INVALID_JSON_STRING = 'Invalid JSON string';
export const FIELD_MUST_BE_NUMBER = 'Field must be a number';

const getKeyboardType = ( inputType?: TEXT_INPUT_TYPES ): string => {
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

const getError = ( textInputType: TEXT_INPUT_TYPES, rawValue: string ): string | undefined => {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            if (rawValue.indexOf( '.' ) !== -1) {
                return FIELD_MUST_BE_NUMBER
            }
            return rawValue !== '' && isNaN( +rawValue ) ? FIELD_MUST_BE_NUMBER : undefined;
        case TEXT_INPUT_TYPES.FLOAT:
            return rawValue !== '' && isNaN( +rawValue ) ? FIELD_MUST_BE_NUMBER : undefined;
        case TEXT_INPUT_TYPES.JSON:
            try {
                JSON.parse( rawValue || '' );
                break;
            } catch (err) {
                return INVALID_JSON_STRING;
            }
    }
    return undefined;
};

const defaultDbToRaw = ( textInputType: TEXT_INPUT_TYPES,
                         dbValue: any, ): string => {
    if (!dbValue) {
        return '';
    }
    switch (textInputType) {
        case TEXT_INPUT_TYPES.JSON:
            return JSON.stringify( dbValue, null, 2 );
        default:
            return dbValue.toString();
    }
};

const defaultRawToDb = ( textInputType: TEXT_INPUT_TYPES, value: string ): any => {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            return parseInt( value );
        case TEXT_INPUT_TYPES.FLOAT:
            return parseFloat( value );
        case TEXT_INPUT_TYPES.JSON:
            try {
                return JSON.parse( value || '' );
            } catch (err) {
                return {};
            }
        default:
            return value;
    }
};

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