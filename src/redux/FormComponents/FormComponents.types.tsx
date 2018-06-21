import { InputColorTheme, TextInputDBValue, TextInputProps } from '../../nativeComponents/TextInput/TextInput.types';
import { FORM_INPUT_TYPES, SELECT_INPUT_TYPES } from '../../utils/enums';

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
    | ArrayOfObjectsDBValue

export type RawValue = string;
export type FieldOnChange = (( dbValue: DBValue, error?: boolean ) => void)
export type FieldErrorChecker = (( dbValue: DBValue, rawValue?: RawValue ) => string | undefined);

export interface FieldCommon {
    field: string,
    isRequired?: boolean,
    extraOnChange?: FieldOnChange,
    fieldErrorChecker?: FieldErrorChecker,
}

export interface Option {
    value: any,
    text: string,
}

export interface FormData {
    fields?: {
        [field: string]: FieldReduxData,
    },
    formError?: string,
    values?: {[key: string]: DBValue}
}

export interface FormState {
    [formName: string]: FormData, //FORM_NAMES_ENUM
}

export interface FormHelpersState {
    [formName: string]: {
        sendingForm: boolean,
        sendFormSuccess: boolean,
        showErrors?: boolean,
        response?: any,
    }
}

export type GlobalState = {
    form: FormState,
    formHelpers: FormHelpersState,
};

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
    disableUnderline?: boolean,
    nullName?: string,
    options: Array<Option>,
    title?: string,
    inputStyle?: InputColorTheme,
}

export type ArrayOfObjectsDBValue = Array<{ [key: string]: any }>

export interface ArrayOfObjectsProps {
    title?: string,
    fields: Array<FieldDefinition>,
    wrapFields?: boolean,
}

export type FieldDefinition =
    | TextInputProps & { type: FORM_INPUT_TYPES.TEXT } & FieldCommon
    | SelectProps & { type: FORM_INPUT_TYPES.SELECT } & FieldCommon
    | ArrayOfObjectsProps & { type: FORM_INPUT_TYPES.ARRAY_OF_OBJECTS } & FieldCommon
