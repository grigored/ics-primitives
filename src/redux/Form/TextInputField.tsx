import * as React from 'react';
import { isIOS, isWeb } from '../../primitives/platform/platform';
import { TEXT_INPUT_TYPES } from '../../utils/enums';
import { TextInput } from '../../nativeComponents/TextInput/TextInput';
import { FieldStateProps, TextInputDBValue, TextInputFieldProps } from './form.types';


const parseValue = ( textInputType: TEXT_INPUT_TYPES, value: string ): any => {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            return parseInt(value);
        case TEXT_INPUT_TYPES.FLOAT:
            return parseFloat(value);
        case TEXT_INPUT_TYPES.JSON:
            try {
                return JSON.parse(value || '');
            } catch (err) {
                return {};
            }
        default:
            return value;
    }
};

export const TextInputField = ( {
                                    value,
                                    error,
                                    id,
                                    onChange,
                                    onBlur,
                                    onFocus,
                                    multiline,
                                    placeholder,
                                    textInputType = TEXT_INPUT_TYPES.TEXT,
                                    title,
                                }: TextInputFieldProps & FieldStateProps<TextInputDBValue> ) => (
    <TextInput
        error={error}
        id={id}
        inputType={textInputType}
        labelPositionLeft={isIOS}
        multiline={multiline || textInputType === TEXT_INPUT_TYPES.JSON}
        onChange={( event: any ) => {
            let dbValue = parseValue(textInputType, isWeb ? event.target.value : event);
            onChange && onChange(dbValue);
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        title={title}
        value={value && value.toString()}
    />
);