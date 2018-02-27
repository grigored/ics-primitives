import * as React from 'react';
import { FORM_INPUT_TYPES, SELECT_INPUT_TYPES, TEXT_INPUT_TYPES } from '../../utils/enums';
import {Classes} from "../../utils/theme.types";

export type TextInputDBValue = any;// string | number | {[field: string]: any};
export type SelectDBValue = any;

export type DBValue =
    | TextInputDBValue
    // | DateTimeDBValue
    // | DateMultiTimePickerDBValue
    // | RadioDBValue
    // | S3PhotoComponentDBValue
    // | S3MultiplePhotoComponentDBValue
    | SelectDBValue
    // | LocationPickerValue
    // | ArrayOfObjectsDBValue

export type RawValue = string;
export type FieldOnChange = (( dbValue: DBValue, error?: boolean ) => void)
export type FieldErrorChecker = (( dbValue: DBValue, rawValue?: RawValue ) => string | undefined);

export interface FieldCommon {
    field: string,
    isRequired?: boolean,
    extraOnChange?: FieldOnChange,
    fieldErrorChecker?: FieldErrorChecker,
}

export interface TextInputFieldProps {
    id?: string,
    onFocus?: () => void,
    onBlur?: ()=> void,
    placeholder?: string,
    textInputType?: TEXT_INPUT_TYPES,
    title?: string,
    multiline?: boolean
    input?: any
    value?: any,
}

export interface Option {
    value: any,
    text: string,
}

export interface FieldStateProps<DBValueType> {
    dbValue?: DBValueType,
    value?: any,
    error?: string,
    rawValue?: string,
    onChange: ( dbValue: DBValueType, rawValue?: string, error?: string | null ) => void,
}


export interface FieldReduxData {
    dbValue: DBValue,
    rawValue?: RawValue,
    error?: string,
    touched?: boolean, // if true, then a) will display errors if any, b) will send this data to the server
}

export interface SelectProps {
    selectInputType?: SELECT_INPUT_TYPES,
    defaultValue?: any,
    disabled?: boolean,
    nullable?: boolean,
    nullName?: string,
    options: Array<Option>,
    title?: string,
}

export type FieldDefinition =
    | TextInputFieldProps & { type: FORM_INPUT_TYPES.TEXT } & FieldCommon
    | SelectProps & { type: FORM_INPUT_TYPES.SELECT } & FieldCommon


export interface FormProps {
    containerStyle?: Classes,
    fields: Array<FieldDefinition>,
    getFieldComponent: (
        name: string,
        component: React.ComponentType<any>,
        otherProps: any,
    ) => any,
}
