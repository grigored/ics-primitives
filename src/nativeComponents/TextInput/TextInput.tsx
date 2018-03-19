import { FormHelperText } from "material-ui";
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import {
    defaultDbToRaw, defaultRawToDb, getError,
    getKeyboardType
} from "src/nativeComponents/TextInput/textInputUtils";
import { createStyles } from '../../primitives/createStyles/createStyles';
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { TEXT_INPUT_TYPES } from "../../utils/enums";
import { appTheme } from '../../utils/theme';
import { WithStyles } from '../../utils/theme.types';
import { TextInputDBValue, TextInputProps } from "./TextInput.types";

export const INVALID_JSON_STRING = 'Invalid JSON string';
export const FIELD_MUST_BE_NUMBER = 'Field must be a number';
const styles = () => ( {
    underline: {
        '&:after': {
            backgroundColor: appTheme.textInputUnderlineColor,
        },
        '&:before': {
            backgroundColor: appTheme.textInputUnderlineColor,
        },
        '&:hover:not($disabled):before': {
            backgroundColor: `${appTheme.textInputUnderlineColor} !important`,
        },
        '&:hover:not($disabled):after': {
            backgroundColor: `${appTheme.textInputUnderlineColor} !important`,
        },
    },
    underlineError: {},
    input: {
        color: appTheme.textColor,
    },
} );

export class CTextInput extends React.PureComponent<TextInputProps & WithStyles & FieldStateProps<TextInputDBValue>, { rawValue: string, }> {
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
            onChange, placeholder, inputType, onBlur, title, error, id, multiline,
            disableUnderline, classes, rawToDb,
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
                    InputProps={{
                        disableUnderline,
                        classes: {
                            input: classes.input as any,
                            underline: !!error ? classes.underlineError : classes.underline as any,
                        },
                    }}
                    InputLabelProps={{
                        // shrink: true,
                        style: {
                            color: appTheme.textInputLabelColor,
                        },
                    }}
                />
                {false && <FormHelperText>some helping text here</FormHelperText>}
            </FormControl>
        );
    }
}

export const TextInput: React.ComponentType<TextInputProps & FieldStateProps<TextInputDBValue>> = createStyles(
    styles,
    'TextInput',
    CTextInput
);
