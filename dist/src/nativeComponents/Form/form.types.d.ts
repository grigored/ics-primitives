/// <reference types="react" />
import * as React from 'react';
import { FORM_INPUT_TYPES, TEXT_INPUT_TYPES } from "../../utils/enums";
export interface FieldCommon {
    name: string;
}
export interface TextInputProps {
    id?: string;
    onFocus?: () => void;
    placeholder?: string;
    textInputType?: TEXT_INPUT_TYPES;
    title?: string;
    multiline?: boolean;
}
export declare type FieldDefinition = TextInputProps & {
    type: FORM_INPUT_TYPES.TEXT;
} & FieldCommon;
export interface FormProps {
    fieldDefinitions: Array<FieldDefinition>;
    getFieldComponent: (name: string, component: React.ComponentType<any>, otherProps: any) => any;
}
