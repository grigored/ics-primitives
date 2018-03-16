import * as React from 'react';
import { View } from "src";
import { getSelectData } from "src/nativeComponents/Select/selectUtils";
import { CustomPicker } from "src/nativeComponents/TextInputContainer/CustomPicker";
import { TextInputContainer } from "src/nativeComponents/TextInputContainer/TextInputContainer.native";
import { isIOS } from "src/primitives/platform/platform";
import { FieldStateProps, SelectDBValue, SelectProps } from "src/redux/FormComponents/FormComponents.types";
import { _t } from "src/utils/common";

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
            options,
            title,
            value,
        } = this.props;
        let { selectedTitle, } = getSelectData( this.props );
        return (
            <View style={{ flex: 1 }}>
                <TextInputContainer
                    title={title}
                    labelPositionLeft={isIOS}
                    onPress={this._showModal}
                    value={_t( selectedTitle )}
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