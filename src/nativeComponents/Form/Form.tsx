import * as React from 'react';
import { FormProps } from './form.types';
import {createStyles, View, WithStyles} from '../..';
import { FORM_INPUT_TYPES } from '../../utils/enums';
import { TextInput } from './TextInput/TextInput';

const styles = {
    formContainer: {
        flexDirection: 'column'
    },
};

const CForm: React.StatelessComponent<FormProps & WithStyles> = ({
    classes,
    containerStyle,
    fields,
    getFieldComponent,
}) => (
    <View style={[classes.formContainer, containerStyle]}>
        {fields.map(({name, type, ...other}) => {
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

export const Form = createStyles(styles, "Form", CForm);
