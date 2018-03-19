import * as React from 'react';
import {DatePickerIOS, StyleSheet, TouchableHighlight, Picker} from 'react-native';
import { createStyles, Text, View, WithStyles } from "../../";
import { Option } from "../../redux/FormComponents/FormComponents.types";
import { _t } from "../../utils/common";
import ReactNativeModal from 'react-native-modal';


const BORDER_RADIUS = 13;
const BACKGROUND_COLOR = 'white';
const BORDER_COLOR = '#d5d5d5';
const TITLE_FONT_SIZE = 13;
const TITLE_COLOR = '#8f8f8f';
const BUTTON_FONT_WEIGHT = 'normal';
const BUTTON_FONT_COLOR = '#007ff9';
const BUTTON_FONT_SIZE = 20;

const styles = () => ({
    contentContainer: {
        justifyContent: 'flex-end',
        margin: 10,
    },
    datepickerContainer: {
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: BORDER_RADIUS,
        marginBottom: 8,
        overflow: 'hidden',
    },
    titleContainer: {
        borderBottomColor: BORDER_COLOR,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 14,
        backgroundColor: 'transparent',
    },
    title: {
        textAlign: 'center',
        color: TITLE_COLOR,
        fontSize: TITLE_FONT_SIZE,
    },
    confirmButton: {
        borderColor: BORDER_COLOR,
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'transparent',
        height: 57,
        justifyContent: 'center',
    },
    confirmText: {
        textAlign: 'center',
        color: BUTTON_FONT_COLOR,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: BUTTON_FONT_WEIGHT,
        backgroundColor: 'transparent',
    },
    cancelButton: {
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: BORDER_RADIUS,
        height: 57,
        justifyContent: 'center',
    },
    cancelText: {
        padding: 10,
        textAlign: 'center',
        color: BUTTON_FONT_COLOR,
        fontSize: BUTTON_FONT_SIZE,
        fontWeight: '600',
        backgroundColor: 'transparent',
    },
});


export interface CustomPickerProps {
    cancelTextIOS?: string
    confirmTextIOS?: string
    isSelect: boolean
    isVisible: boolean
    maximumDate?: Date
    minimumDate?: Date
    minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30
    mode?: "date" | "time" | "datetime"
    neverDisableConfirmIOS?: boolean
    onCancel: () => void
    onConfirm: (value: any) => void
    options?: Array<Option>
    title?: string
    value: any,
}

interface CustomPickerState {
    value: Date | any,
    userIsInteractingWithPicker: boolean
}

class CCustomPicker extends React.PureComponent<CustomPickerProps & WithStyles, CustomPickerState> {

    static defaultProps = {
        neverDisableConfirmIOS: false,
        cancelTextIOS: 'Cancel',
        confirmTextIOS: 'Confirm',
        isVisible: false,
    };

    state = {
        value: this.props.value,
        userIsInteractingWithPicker: false,
    };
    _handleConfirm = () => {
        this.props.onConfirm(this.state.value);
    };
    _handleValueChange = (value: any) => {
        this.setState({
            value,
            userIsInteractingWithPicker: false,
        });
    };
    _handleUserTouchInit = () => {
        this.setState({
            userIsInteractingWithPicker: true,
        });
        return false;
    };

    componentWillReceiveProps(nextProps: Readonly<CustomPickerProps>) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }

    render() {
        const {
            cancelTextIOS,
            classes,
            confirmTextIOS,
            isVisible,
            isSelect,
            minuteInterval,
            mode,
            neverDisableConfirmIOS,
            onCancel,
            options,
            title,
        } = this.props;

        return (
            <ReactNativeModal
                isVisible={!!isVisible}
                style={classes.contentContainer as any}
                backdropOpacity={0.4}
            >
                <View style={classes.datepickerContainer}>
                    <View style={classes.titleContainer}>
                        <Text style={classes.title}>{_t(title)}</Text>
                    </View>
                    <View /*onStartShouldSetResponderCapture={this._handleUserTouchInit}*/>
                        {isSelect
                            ? <Picker
                                selectedValue={this.state.value}
                                onValueChange={this._handleValueChange}
                            >
                                {options!.map((option: any) =>
                                    <Picker.Item key={option.value} label={_t(option.text)} value={option.value}/>
                                )}
                            </Picker>
                            : <DatePickerIOS
                                date={this.state.value}
                                mode={mode}
                                onDateChange={this._handleValueChange}
                                minuteInterval={minuteInterval}
                            />
                        }

                    </View>
                    <TouchableHighlight
                        style={classes.confirmButton as any}
                        underlayColor='#ebebeb'
                        onPress={this._handleConfirm}
                        disabled={!neverDisableConfirmIOS && this.state.userIsInteractingWithPicker}
                    >
                        <View>
                            <Text style={classes.confirmText}>{confirmTextIOS}</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight
                    style={classes.cancelButton as any}
                    underlayColor='#ebebeb'
                    onPress={onCancel}
                >
                    <View>
                        <Text style={classes.cancelText}>{cancelTextIOS}</Text>
                    </View>
                </TouchableHighlight>
            </ReactNativeModal>
        );
    }
}

const componentName = 'CustomPicker';
export const CustomPicker = createStyles<CustomPickerProps>(styles, componentName, CCustomPicker);
