import { TEXT_INPUT_TYPES } from "../../utils/enums";

export interface TextInputProps {
    error?: string,
    id?: string,
    inputType: TEXT_INPUT_TYPES,
    labelPositionLeft?: boolean,
    onBlur?: () => void,
    onChange?: any // optional, don't want controlled components for autocomplete, datepicker
    onFocus?: () => void,
    placeholder?: string,
    title?: string,
    value?: string,
    multiline?: boolean,
    input?: any
    rawToDb?: ( value: string ) => any,
    dbToRaw?: ( value: any ) => string,
    extraErrorChecker?: ( value: string ) => string | undefined,
    disableUnderline?: boolean,
    inputStyle?: InputStyle,
}

export interface InputStyle {
    input?: any,
    inputError?: any,
    inputFocused?: any,
    label?: any,
    labelError?: any,
    labelFocused?: any,
    error?: any,
    errorFocused?: any,
}

export type TextInputDBValue = any;// string | number | {[field: string]: any};
