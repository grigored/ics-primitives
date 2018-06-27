import * as React from 'react';
import { View } from '../../';
import { isIOS } from '../../primitives/platform/platform';
import { FieldStateProps, SelectDBValue, SelectProps } from '../../redux/FormComponents/FormComponents.types';
import { CustomPicker } from '../TextInputContainer/CustomPicker';
import { TextInputContainer } from '../TextInputContainer/TextInputContainer.native';
import { getSelectData } from './selectUtils';

export class Select extends React.PureComponent<SelectProps & FieldStateProps<SelectDBValue>, { isModalVisible: boolean }> {
    state = {
        isModalVisible: false,
        minuteInterval: 1,
    };

    _hideModal = () => {
        this.setState( { isModalVisible: false } );
    };

    _showModal = () => {
        this.setState( { isModalVisible: true } );
    };

    _onConfirm = ( value: any ) => {
        const { onChange } = this.props;
        onChange( value );
        this.setState( { isModalVisible: false } );
    };

    render() {
        const {
            nullName,
            nullable,
            options,
            title,
            value,
            multiple,
        } = this.props;
        let { selectedIndex, optionsList } = getSelectData( options, value, multiple, nullName, nullable );
        return (
            <View style={{ flex: 1 }}>
                <TextInputContainer
                    title={title}
                    labelPositionLeft={isIOS}
                    onPress={this._showModal}
                    value={optionsList[selectedIndex].value}
                />
                <CustomPicker
                    isVisible={this.state.isModalVisible}
                    onConfirm={this._onConfirm}
                    onCancel={this._hideModal}
                    title={title}
                    value={value}
                    isSelect={true}
                    options={options}
                />
            </View>
        );
    }
}