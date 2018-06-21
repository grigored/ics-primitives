import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { compose } from 'redux';
import { FormItem } from '../../redux/FormComponents/FormItem';
import {
    ArrayOfObjectsDBValue, ArrayOfObjectsProps, DBValue, FieldCommon, FieldDefinition,
    FieldStateProps
} from '../../redux/FormComponents/FormComponents.types';
import { Button, Text, View, WithStyles, createStyles, getNestedField } from '../../';
import { appTheme, web } from '../../utils/theme';

const FIELDS_MIN_WIDTH = 250;

const styles = () => ({
    container: {
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 0,
        margin: appTheme.defaultVerticalMargin,
    },
    objectContainer: {
        width: '100%',
        flexDirection: 'column',
        [web]: {
            border: '1px solid #000000',
        },
    },
    objectContainerWrap: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    formItemContainer: {
        flex: 1,
        margin: appTheme.defaultVerticalMargin,
        minWidth: FIELDS_MIN_WIDTH,
        width: '100%',
    },
});

export type OwnProps =
    ArrayOfObjectsProps
    & FieldStateProps<ArrayOfObjectsDBValue>
    & FieldCommon
    & InjectedTranslateProps;
type Props = OwnProps & WithStyles;

class CArrayOfObjects extends React.PureComponent<Props, {}> {
    _bindedAddObject: Function;
    _bindedRemoveObject: Function;
    _totalAddedObjectsCount: number = 0;

    constructor( props: Props ) {
        super(props);
        if (!props.value || (!!props.value && props.value.length === 0)) {
            this.addObject();
        }
        this._totalAddedObjectsCount = props.value ? props.value.length + 1 : 0;
        this._bindedAddObject = this.addObject.bind(this);
        this._bindedRemoveObject = this.removeObject.bind(this);
    }

    onItemChange( objectIndex: number, field: string, newValue: DBValue ) {
        let {value, fields, onChange} = this.props;
        let crtField = null;
        for (let objField of fields) {
            if (objField.field == field) {
                crtField = objField;
                break;
            }
        }

        if (objectIndex >= value.length) {
            return;
        }

        let newFieldValue = [
            ...value.slice(0, objectIndex),
            {
                ...value[objectIndex],
                [field]: newValue,
            },
            ...value.slice(objectIndex + 1),
        ];

        let error = !!crtField && !!crtField.fieldErrorChecker && crtField.fieldErrorChecker(newValue);
        if (!!error) {
            newFieldValue[objectIndex]._errors = {...(newFieldValue[objectIndex]._errors || {}), [field]: error};
        } else {
            if (!!newFieldValue[objectIndex]._errors) {
                delete newFieldValue[objectIndex]._errors;
            }
        }

        onChange(newFieldValue);
        !!crtField && !!crtField.extraOnChange && crtField.extraOnChange(newValue, !!error);
    }

    getValue( objectIndex: number, field: string, ): DBValue {
        let {value} = this.props;
        if (!!value && !!value[objectIndex] && !!value[objectIndex]) {
            return value[objectIndex][field];
        }
        return undefined;
    }

    getError( objectIndex: number, field: string, ): string | undefined {
        let {value} = this.props;
        return getNestedField(value[objectIndex], ['_errors', field]) || undefined;
    }

    addObject() {
        let {value, onChange} = this.props;
        onChange([...(value || []), {_overallIndex: this._totalAddedObjectsCount++}]);
    }

    removeObject( index: number ) {
        let {value, onChange} = this.props;
        onChange((value || []).filter(( val: any, valueIndex: number ) => index !== valueIndex));
    }

    render() {
        // let {classes, title, fields, t, wrapFields, value, error, field,} = this.props;
        let {classes, title, fields, t, wrapFields, value, error, } = this.props;

        return (
            <View style={classes.container}>
                {!!title && <Text>{t(title)}</Text>}
                {
                    !!value && value.map(( objValue: DBValue, objectIndex: number ) =>
                        <View
                            key={title + '_item_' + objectIndex.toString()}
                            style={[classes.objectContainer, wrapFields ? classes.objectContainerWrap : {}]}
                        >
                            {
                                fields.map(( fieldDefinition: FieldDefinition, fieldIndex: number ) => (
                                    <View
                                        style={classes.formItemContainer}
                                        key={title + '_item_' + objectIndex + '_field_' + fieldIndex}
                                    >
                                        <FormItem
                                            // style={{width: '100%',}}
                                            fieldDefinition={
                                                // fieldDefinition.type === FORM_INPUT_TYPES.ARRAY_PHOTO_UPLOAD ||
                                                // fieldDefinition.type === FORM_INPUT_TYPES.PHOTO_UPLOAD
                                                //     ? {
                                                //         ...fieldDefinition,
                                                //         field: field + '_' +
                                                //         fieldDefinition.field + '_' +
                                                //         objValue._overallIndex !== null &&
                                                //         objValue._overallIndex !== undefined
                                                //             ? objValue._overallIndex
                                                //             : objectIndex,
                                                //     }
                                                //     : fieldDefinition
                                                fieldDefinition
                                            }
                                            input={{
                                                onChange: this.onItemChange.bind(this, objectIndex, fieldDefinition.field),
                                                value: this.getValue(objectIndex, fieldDefinition.field),
                                            }}
                                            meta={{error: this.getError(objectIndex, fieldDefinition.field)}}
                                        />
                                    </View>
                                ))
                            }
                            <Button
                                // icon={iconList.cancel}
                                title={'Remove object'}
                                onPress={this.removeObject.bind(this, objectIndex)}
                            />
                        </View>
                    )}
                {/*<SimpleButton*/}
                {/*onPress={this._bindedAddObject as any}*/}
                {/*title={'Add new object'}*/}
                {/*/>*/}
                <Button
                    title={'Add new object'}
                    onPress={this._bindedAddObject as any}
                />
                {
                    !!error && <Text style={{color: 'red'}}>{t(error)}</Text>
                }
            </View>
        );
    }
}

const componentName = 'ArrayOfObjects';
export const ArrayOfObjects = compose(
    translate(),
    createStyles(styles, componentName),
)(CArrayOfObjects) as React.ComponentType<OwnProps>;
