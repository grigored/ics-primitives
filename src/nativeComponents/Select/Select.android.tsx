import * as React from 'react';
import { Picker } from 'react-native';
import { appTheme, createStyles, Text, View, WithStyles } from '../../';
import { getSelectData, NOT_AVAILABLE_FIELD_VALUE } from '../../nativeComponents/Select/selectUtils';
import { FieldStateProps, SelectDBValue, SelectProps } from '../../redux/FormComponents/FormComponents.types';

const styles = () => ({
    container: {
        paddingTop: 2,
        // paddingLeft: 4,
    },
    label: {
        fontSize: 12,
        color: appTheme.primaryColor,
    },
    picker: {
        marginTop: -9,
        marginBottom: -15,
        marginLeft: -8,
        marginRight: -8,
    },
    emptyPicker: {
        marginTop: 8,
    },
    bottomBorder: {
        height: 1,
        width: '100%',
    },
});

type Props = SelectProps & FieldStateProps<SelectDBValue> & WithStyles;

class CSelect extends React.PureComponent<Props, { itemValue?: number }> {
    constructor( props: Props ) {
        super(props);
        let {selectedValue,} = getSelectData(props);

        this.state = {itemValue: selectedValue};
    }

    render() {
        const {title, onChange, classes} = this.props;
        let {error, selectedValue, optionsList} = getSelectData(this.props);
        return (
            <View style={classes.container}>
                <Text style={classes.label}>{title || ' '}</Text>
                <Picker
                    style={[classes.picker, selectedValue === NOT_AVAILABLE_FIELD_VALUE && classes.emptyPicker] as any}
                    selectedValue={this.state.itemValue}
                    onValueChange={( value, index ) => {
                        if (value === NOT_AVAILABLE_FIELD_VALUE && index === 0) {
                            value = null;
                        }
                        this.setState({itemValue: value});
                        onChange && onChange(value);
                    }}
                >
                    {optionsList.map(( option, index ) =>
                        <Picker.Item
                            key={option.key}
                            value={option.value}
                            label={option.label}
                        />
                    )}
                </Picker>
                <View style={[classes.bottomBorder, {
                    backgroundColor: error ? '#fff' : appTheme.primaryColor,
                }]}/>
                {!!error ? <Text style={classes.baseErrorText}>{error}</Text> : null}
            </View>
        );
    }
};

const componentName = 'Select';
export const Select = createStyles(styles, componentName)(CSelect);
