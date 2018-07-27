import { FormControl } from '@material-ui/core';
import * as React from 'react';
import { appTheme, createStyles, Text, WithStyles } from '../../';
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { shallowEqual } from '../../utils/common';
import { TEXT_INPUT_TYPES } from '../../utils/enums';
import { getStyleProps } from '../../utils/web';
import { TextInputDBValue, TextInputProps } from './TextInput.types';
import { defaultDbToRaw, defaultGetError, defaultRawToDb, getKeyboardType } from './TextInput.utils';

export const INVALID_JSON_STRING = 'Invalid JSON string';
export const FIELD_MUST_BE_NUMBER = 'Field must be a number';

const styles = () => ({
    input: {
        backgroundColor: 'transparent',
        color: appTheme.textColor,
        fontSize: appTheme.fontSizeM,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: appTheme.textColor,
        outline: 0,
        marginBottom: 1,
        paddingTop: 4,
        paddingBottom: 4,
    },
    inputError: {
        color: appTheme.errorColor,
    },
    inputFocused: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: appTheme.primaryColor,
        marginBottom: 0,
    },
    label: {
        color: appTheme.textColor,
        fontSize: appTheme.fontSizeS,
    },
    labelError: {
        color: appTheme.errorColor,
    },
    labelFocused: {
        color: appTheme.primaryColor,
    },
    error: {
        color: appTheme.errorColor,
        fontSize: appTheme.fontSizeS,
    },
    errorFocused: {
    },
});


export type Props = TextInputProps & FieldStateProps<TextInputDBValue> & WithStyles

export class CTextInput extends React.PureComponent<Props, { focused: boolean }> {
    _rawValue: string = '';

    constructor( props: Props ) {
        super(props);
        let {value} = this.props;
        this.state = {
            focused: false,
        };
        this._rawValue = (value !== null && value !== undefined)
            ? this.getRawValue(value)
            : '';
    }

    getRawValue( dbValue: TextInputDBValue ): string {
        let {dbToRaw, inputType = TEXT_INPUT_TYPES.TEXT} = this.props;
        return !!dbToRaw
            ? dbToRaw(dbValue)
            : defaultDbToRaw(inputType, dbValue);
    }

    getDbValue( rawValue: string ): TextInputDBValue {
        let {rawToDb, inputType = TEXT_INPUT_TYPES.TEXT} = this.props;
        return !!rawToDb
            ? rawToDb(rawValue)
            : defaultRawToDb(inputType, rawValue);
    }

    getError( rawValue: string ): string | undefined {
        let {extraErrorChecker, inputType} = this.props;
        return (!!extraErrorChecker && extraErrorChecker(rawValue)) || defaultGetError(inputType, rawValue);
    }

    componentWillReceiveProps( nextProps: Props ) {
        let {value} = nextProps,
            dbValue = (value !== null && value !== undefined && value.value !== null && value.value !== undefined)
                ? value.value
                : value,
            parsedRawValue = this.getDbValue(this._rawValue);

        let shouldChangeRawValue: boolean = (typeof parsedRawValue !== typeof dbValue);

        if (typeof parsedRawValue == typeof dbValue) {
            if (typeof dbValue === 'object') {
                shouldChangeRawValue = !shallowEqual(parsedRawValue, dbValue);
            } else {
                shouldChangeRawValue = parsedRawValue !== dbValue;
            }
        }

        if (shouldChangeRawValue) {
            // this.props.field == 'theme' && console.log("SHOULD CHANGE RAW VALUE 'CUZ Y NOT");
            this._rawValue = (dbValue !== null && dbValue !== undefined)
                ? this.getRawValue(dbValue)
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
            // multiline,
            onChange,
            classes,
            inputStyle = {},
        } = this.props;

        const {focused} = this.state;

        return (
            <FormControl fullWidth>
                {
                    title && <Text style={[
                        classes.label,
                        inputStyle.label,
                        focused && classes.labelFocused,
                        focused && inputStyle.labelFocused,
                        !!error && classes.labelError,
                        !!error && inputStyle.labelError,
                    ]}>
                        {title}
                    </Text>
                }
                <input
                    {...getStyleProps([
                        classes.input,
                        inputStyle.input,
                        focused && classes.inputFocused,
                        focused && inputStyle.inputFocused,
                        !!error && classes.inputError,
                        !!error && inputStyle.inputError,
                    ])}
                    id={id}
                    value={this._rawValue}
                    placeholder={placeholder || ''}
                    type={getKeyboardType(inputType)}
                    onChange={( ev: React.ChangeEvent<HTMLInputElement> ) => {
                        let rawValue = ev.target.value;
                        let dbValue = this.getDbValue(rawValue);
                        this._rawValue = rawValue;
                        this.forceUpdate();
                        let fieldError = this.getError(rawValue);
                        onChange && onChange(!!fieldError ? {value: dbValue, error: fieldError} : dbValue);

                    }}
                    onBlur={() => {
                        onBlur && onBlur();
                        this.setState({focused: false})
                    }}
                    onFocus={(a) => {this.setState({focused: true})}}
                />
                {
                    error && <Text style={[
                        classes.error,
                        inputStyle.error,
                        focused && classes.errorFocused,
                        focused && inputStyle.errorFocused,
                    ]}>
                        {error}
                    </Text>
                }
            </FormControl>
        );
    }
}

export const TextInput: React.ComponentType<TextInputProps & FieldStateProps<TextInputDBValue>> = createStyles(
    styles,
    'TextInput'
)(CTextInput);
