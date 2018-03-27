import { FormHelperText } from "material-ui";
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { appTheme, createStyles, WithStyles } from "../../";
import { FieldStateProps } from "../../redux/FormComponents/FormComponents.types";
import { shallowEqual } from "../../utils/common";
import { TEXT_INPUT_TYPES } from "../../utils/enums";
import { TextInputDBValue, TextInputProps } from "./TextInput.types";
import { defaultDbToRaw, defaultGetError, defaultRawToDb, getKeyboardType } from "./TextInput.utils";

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


export type Props = TextInputProps & FieldStateProps<TextInputDBValue> & WithStyles

export class CTextInput extends React.PureComponent<Props, { rawValue: string, }> {
    _rawValue: string = '';

    constructor( props: Props ) {
        super( props );
        let { value } = this.props;
        this._rawValue = ( value !== null && value !== undefined )
            ? this.getRawValue( value )
            : '';
    }

    getRawValue( dbValue: TextInputDBValue ): string {
        let { dbToRaw, inputType = TEXT_INPUT_TYPES.TEXT } = this.props;
        return !!dbToRaw
            ? dbToRaw( dbValue )
            : defaultDbToRaw( inputType, dbValue );
    }

    getDbValue( rawValue: string ): TextInputDBValue {
        let { rawToDb, inputType = TEXT_INPUT_TYPES.TEXT } = this.props;
        return !!rawToDb
            ? rawToDb( rawValue )
            : defaultRawToDb( inputType, rawValue );
    }

    getError( rawValue: string ): string | undefined {
        let { extraErrorChecker, inputType } = this.props;
        return ( !!extraErrorChecker && extraErrorChecker( rawValue ) ) || defaultGetError( inputType, rawValue );
    }

    componentWillReceiveProps( nextProps: Props ) {
        let { value } = nextProps,
            dbValue = ( value !== null && value !== undefined && value.value !== null && value.value !== undefined )
                ? value.value
                : value,
            parsedRawValue = this.getDbValue( this._rawValue );

        let shouldChangeRawValue: boolean = ( typeof parsedRawValue !== typeof dbValue );

        if (typeof parsedRawValue == typeof dbValue) {
            if (typeof dbValue === 'object') {
                shouldChangeRawValue = !shallowEqual( parsedRawValue, dbValue );
            } else {
                shouldChangeRawValue = parsedRawValue !== dbValue;
            }
        }

        if (shouldChangeRawValue) {
            // this.props.field == 'theme' && console.log("SHOULD CHANGE RAW VALUE 'CUZ Y NOT");
            this._rawValue = ( dbValue !== null && dbValue !== undefined )
                ? this.getRawValue( dbValue )
                : '';
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
            disableUnderline,
            classes,
        } = this.props;
        return (
            <FormControl fullWidth>
                <TextField
                    id={id}
                    value={this._rawValue}
                    error={!!error}
                    multiline={multiline}
                    placeholder={placeholder || ''}
                    label={title || ''}
                    type={getKeyboardType( inputType )}
                    onChange={( ev: React.ChangeEvent<HTMLInputElement> ) => {
                        let rawValue = ev.target.value;
                        let dbValue = this.getDbValue( rawValue );
                        this._rawValue = rawValue;
                        this.forceUpdate();
                        let fieldError = this.getError( rawValue );
                        onChange && onChange( !!fieldError ? { value: dbValue, error: fieldError } : dbValue );

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
    'TextInput'
)( CTextInput );
