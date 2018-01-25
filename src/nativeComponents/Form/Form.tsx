import * as React from 'react';
import { FormProps } from "./form.types";
import { View } from '../..';
import {FORM_INPUT_TYPES} from "../../utils/enums";
import {TextInput} from "./TextInput/TextInput";

export const Form: React.StatelessComponent<FormProps> = ({fieldDefinitions, getFieldComponent}) => {
    return (
        <View>
            {fieldDefinitions.map(({name, type, ...other}) => {
                let component;
                switch (type) {
                    case FORM_INPUT_TYPES.TEXT:
                        component = TextInput;
                    default:
                        component = TextInput;
                }

                return getFieldComponent(
                    name,
                    component,
                    other,
                )}
            )}
        </View>
    );
};
