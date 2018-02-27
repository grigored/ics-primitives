import * as React from 'react';
import { StyleProp, TextInput as TextInputNative, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { appTheme, createStyles, Text, View, WithStyles } from '../../';
import { TEXT_INPUT_TYPES } from '../../utils/enums';
import { TextInputProps } from './TextInput.types';


let styles = () => ({
    containerLeft: {
        flexDirection: 'row',
        height: appTheme.inputHeight,
        alignItems: 'center',
    },
    leftLabel: {
        fontWeight: "500",
        minWidth: 150,
    },
    topLabel: {
        marginBottom: -10,
        color: appTheme.primaryColor,
    },
    leftText: {
        flex: 1,
    },
    error: {
        marginTop: -5,
        zIndex: 0,
        color: appTheme.errorColor,
    },
});

const getKeyboardType = (inputType: TEXT_INPUT_TYPES) => {
    switch (inputType) {
        case TEXT_INPUT_TYPES.EMAIL:
            return 'email-address';
        case TEXT_INPUT_TYPES.PHONE:
            return 'phone-pad';
        default:
            return 'default';
    }
};


class CTextInput extends React.PureComponent<TextInputProps & WithStyles, {}> {
    private inputRef: any;

    render() {
        let {
            classes,
            error,
            inputType,
            labelPositionLeft,
            onChange,
            onFocus,
            placeholder,
            title,
            value,
        } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={() => this.inputRef.focus()}
            >
                <View>
                    <View style={labelPositionLeft ? classes.containerLeft : undefined}>
                        <Text style={labelPositionLeft ? classes.leftLabel: classes.topLabel}>
                            {title}
                        </Text>
                        <TextInputNative
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={getKeyboardType(inputType)}
                            onChangeText={onChange}
                            onFocus={onFocus}
                            placeholder={placeholder}
                            ref={input => this.inputRef = input}
                            secureTextEntry={inputType === TEXT_INPUT_TYPES.PASSWORD}
                            style={labelPositionLeft ? classes.leftText as StyleProp<TextStyle>: null}
                            underlineColorAndroid={appTheme.primaryColor}
                            value={value}
                        />
                    </View>
                    {!!error && <Text style={classes.error}>{error}</Text>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const componentName = 'TextInput';
export const TextInput = createStyles<TextInputProps>(styles, componentName, CTextInput);
