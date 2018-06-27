import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { ArrayOfObjects } from '../../nativeComponents/ArrayOfObjects/ArrayOfObjects';
import { Select } from "../../nativeComponents/Select/Select";
import { TextInput } from '../../nativeComponents/TextInput/TextInput';
import { Text } from '../../primitives/Text/Text';
import { View } from '../../primitives/View/View';
import { FORM_INPUT_TYPES } from '../../utils/enums';
import { StyleRules } from '../../utils/theme.types';
import { DBValue, FieldDefinition, FieldReduxData } from './FormComponents.types';

export interface FormItemProps {
    handleFieldChange?: ( field: string, fieldReduxData: FieldReduxData, currentRawValue?: any ) => void,
    fieldReduxData?: FieldReduxData,
    fieldDefinition: FieldDefinition,
    error?: string,
    input: {
        value: any,
        error?: string,
        onChange: Function,
        onBlur?: Function,
    },
    meta?: {
        error?: string,
        touched?: boolean,
    },
    style?: StyleRules,
    onTouch?: any,
}

const UnImplemented = () => <Text>Unimplemented</Text>;

const getFormItemComponent = ( type: FORM_INPUT_TYPES ) => {
    switch (type) {
        // case FORM_INPUT_TYPES.DATE:
        //     return DateTime;
        // case FORM_INPUT_TYPES.MULTIPLE_DATE_TIME:
        //     return DateMultiTimePicker;
        // case FORM_INPUT_TYPES.PHOTO_UPLOAD:
        //     return S3PhotoInputComponent;
        case FORM_INPUT_TYPES.SELECT:
            return Select;
        case FORM_INPUT_TYPES.TEXT:
            return TextInput;
        // case FORM_INPUT_TYPES.RADIO:
        //     return RadioGroup;
        // case FORM_INPUT_TYPES.ARRAY_PHOTO_UPLOAD:
        //     return S3MultiplePhotoInputComponent;
        // case FORM_INPUT_TYPES.PLACES_AUTOCOMPLETE:
        //     return GooglePlacesAutocomplete;
        case FORM_INPUT_TYPES.ARRAY_OF_OBJECTS:
            return ArrayOfObjects;
        // case FORM_INPUT_TYPES.LOCATION_PICKER:
        //     return LocationPicker;
    }
    return UnImplemented;
};

class CFormItem extends React.PureComponent<FormItemProps & InjectedTranslateProps, {}> {
    render() {
        const { fieldDefinition, input, meta, onTouch, style, t } = this.props,
            FormItemComponent = fieldDefinition && getFormItemComponent( fieldDefinition.type ) as React.ComponentType<any>;
        return (
            <View style={style || {}}>
                <FormItemComponent
                    {...fieldDefinition}
                    {...input}
                    onBlur={() => {
                        onTouch && onTouch();
                    }}
                    onChange={( value: DBValue ) => {
                        input && input.onChange && input.onChange( value );
                        fieldDefinition.extraOnChange && fieldDefinition.extraOnChange( value, !!meta && !!meta.error );
                        onTouch && onTouch();
                    }}
                    value={input && input.value}
                    error={meta && meta.touched && t( meta.error || '' )}
                />
            </View>
        );
    }
}

export const FormItem: React.ComponentType<FormItemProps> = translate()( CFormItem );
