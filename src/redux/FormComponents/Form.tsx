import * as React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { FORM_INPUT_TYPES } from '../../utils/enums';
import { ScrollView } from '../../primitives/ScrollView/ScrollView';
import { appTheme, web } from '../../utils/theme';
import { createStyles } from '../../primitives/createStyles/createStyles';
import { Text } from '../../primitives/Text/Text';
import { View } from '../../primitives/View/View';
import { getNestedField, shallowEqual } from '../../utils/common';
import { StyleRules, WithStyles } from '../../utils/theme.types';
import { DBValue, FieldDefinition, GlobalState } from './FormComponents.types';
import { FormItem } from './FormItem';

const REQUIRED_FIELD = 'REQUIRED_FIELD';
const styles = () => ( {
    container: {
        [web]: {
            overflowY: 'auto',
            flexGrow: 1,
            flexShrink: 0,
        },
        margin: appTheme.defaultVerticalMargin,
        flexDirection: 'column',
    }
} );

export type FormErrorChecker = ( values: { [key: string]: any } ) => ( undefined | { form: string } );

export interface FormProps {
    handleSubmit?: any, // do we need this?
    fieldDefinitions: Array<FieldDefinition>,
    form: string,
    containerStyle?: StyleRules,
    allRequired?: boolean,
    alwaysTouched?: boolean,
    destroyOnUnmount?: boolean, // do we need this?
    initialValues?: { [key: string]: any } | null,
    validate?: FormErrorChecker,
    enableReinitialize?: boolean,
    fields?: any, // do we need this?
    keepDirty?: boolean, // do we need this?
}

interface ConnectedProps {
    formError: string | undefined,
    showErrors?: boolean,
}

type Props = FormProps & InjectedFormProps<{}, FormProps> & ConnectedProps & WithStyles

const FormField = Field as any;

class CForm extends React.PureComponent<Props, {}> {
    _bindedOnTouchDict: { [field: string]: () => void } = {};
    _fieldErrorCheckers: any = {};

    constructor( props: Props ) {
        super( props );

        for (let field of props.fieldDefinitions) {

            this._bindedOnTouchDict[field.field] = this.props.touch.bind( this, props.form, field.field );

            if (props.alwaysTouched) {
                this.props.touch( props.form, field.field );
            }

            this._fieldErrorCheckers[field.field] = !!field.fieldErrorChecker
                ? [field.fieldErrorChecker]
                : [];

            if (props.allRequired || field.isRequired) {
                this._fieldErrorCheckers[field.field].push(
                    ( value: DBValue ) => !!value && value !== 0 ? undefined : REQUIRED_FIELD
                );
            }

            if (field.type === FORM_INPUT_TYPES.TEXT) {
                this._fieldErrorCheckers[field.field].push(
                    (value: any) => !!value && !!value.error ? value.error : undefined
                );
            }

            // if (field.type == FORM_INPUT_TYPES.ARRAY_OF_OBJECTS) {
            //     this._fieldErrorCheckers[field.field].push(
            //         ( value: DBValue ) => {
            //             for (let index in value) {
            //                 if (!!value[index]._errors) {
            //                     for (let err in value[index]._errors) {
            //                         if (!!value[index]._errors[err]) {
            //                             return FIELD_HAS_ERRORS;
            //                         }
            //                     }
            //                 }
            //             }
            //             return undefined;
            //         }
            //     )
            // }
        }
    }

    componentWillReceiveProps( nextProps: Props ) {
        if (!this.props.showErrors && !!nextProps.showErrors) {
            for (let field of nextProps.fieldDefinitions) {
                if (nextProps.allRequired || field.isRequired) {
                    this._bindedOnTouchDict[field.field]();
                }
            }
        }
        if (nextProps.enableReinitialize &&
            !shallowEqual( this.props.initialValues, nextProps.initialValues ) &&
            !!nextProps.initialValues) {
            for (let field in nextProps.initialValues) {
                nextProps.touch( nextProps.form, field );
            }
        }
    }

    render() {
        let { classes, fieldDefinitions, containerStyle, formError } = this.props;
        return (
            <View style={{ width: '100%', }}>
                <ScrollView style={[classes.container, containerStyle]}>
                    {
                        fieldDefinitions.map( ( formField: FieldDefinition, index: number ) =>
                            <FormField
                                key={formField.field}
                                name={formField.field}
                                component={FormItem}
                                fieldDefinition={formField}
                                validate={this._fieldErrorCheckers[formField.field]}
                                // style={{ flexGrow: 1, flexShrink: 0, }}
                                onTouch={this._bindedOnTouchDict[formField.field]}
                            />
                        )
                    }
                    {
                        !!formError &&
                        <Text style={{ color: 'red', }}>
                            {
                                formError
                            }
                        </Text>
                    }
                </ScrollView>
            </View>
        );
    }
}

const componentName = 'Form';
let FormComponent: any = reduxForm( {} )(
    createStyles<Props>(
        styles,
        componentName,
        CForm,
    )
);

export const Form = connect( ( state: GlobalState, ownProps: FormProps ) => {
    let formName = ownProps.form;
    return {
        formError: getNestedField( state.form[formName], ['syncErrors', 'form'] ),
        showErrors: getNestedField( state.formHelpers[formName], ['showErrors'] ),
    };
}, {} )( FormComponent );