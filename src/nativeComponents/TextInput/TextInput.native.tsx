import * as React from 'react';
import { StyleProp, TextInput as TextInputNative, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { defaultDbToRaw, getError } from "src/nativeComponents/TextInput/textInputUtils";
import { appTheme, createStyles, ios, Text, View, WithStyles } from '../../';
import { isIOS } from '../../primitives/platform/platform';
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { TEXT_INPUT_TYPES } from '../../utils/enums';
import { TextInputDBValue, TextInputProps } from './TextInput.types';
import { defaultRawToDb } from './textInputUtils';


let styles = () => ( {
    containerLeft: {
        flexDirection: 'row',
        [ios]: {
            height: appTheme.inputHeight,
        },
        alignItems: 'center',
    },
    leftLabel: {
        fontWeight: "500",
        minWidth: 150,
        color: appTheme.textInputLabelColor,
    },
    topLabel: {
        marginBottom: -10,
        color: appTheme.textInputLabelColor,
    },
    leftText: {
        flex: 1,
        color: appTheme.textColor,
    },
    error: {
        marginTop: -5,
        zIndex: 0,
        color: appTheme.errorColor,
    },
} );

const getKeyboardType = ( inputType: TEXT_INPUT_TYPES ) => {
    switch (inputType) {
        case TEXT_INPUT_TYPES.EMAIL:
            return 'email-address';
        case TEXT_INPUT_TYPES.PHONE:
            return 'phone-pad';
        default:
            return 'default';
    }
};


class CTextInput extends React.PureComponent<TextInputProps & FieldStateProps<TextInputDBValue> & WithStyles, { rawValue: string }> {
    static defaultProps = {
        labelPositionLeft: isIOS,
    };
    private inputRef: any;

    componentWillMount() {
        let { value, inputType = TEXT_INPUT_TYPES.TEXT, dbToRaw, } = this.props;
        if (value !== null && value !== undefined) {
            this.setState( {
                rawValue: !!dbToRaw
                    ? dbToRaw( value )
                    : defaultDbToRaw( inputType, value )
            } )
        } else {
            this.setState( { rawValue: '' } )
        }
    }

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
            rawToDb,
        } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={() => this.inputRef.focus()}
            >
                <View>
                    <View style={labelPositionLeft ? classes.containerLeft : undefined}>
                        <Text style={labelPositionLeft ? classes.leftLabel : classes.topLabel}>
                            {title}
                        </Text>
                        <TextInputNative
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={getKeyboardType( inputType )}
                            onChangeText={( text: string ) => {
                                let rawValue = text;
                                let dbValue = !!rawToDb
                                    ? rawToDb( rawValue )
                                    : defaultRawToDb( inputType, rawValue );
                                this.setState( { rawValue: rawValue } );
                                let fieldError = getError( inputType, rawValue );
                                !!onChange && onChange(
                                    !!fieldError
                                        ? { value: dbValue, error: fieldError }
                                        : dbValue
                                )
                            }}
                            onFocus={onFocus}
                            placeholder={placeholder}
                            selectionColor={appTheme.cursorColor}
                            placeholderTextColor={appTheme.placeholderColor}
                            ref={input => this.inputRef = input}
                            secureTextEntry={inputType === TEXT_INPUT_TYPES.PASSWORD}
                            style={classes.leftText as StyleProp<TextStyle>}
                            underlineColorAndroid={
                                error ? appTheme.errorColor : appTheme.textInputUnderlineColor
                            }
                            value={( value && value.toString() ) || ''}
                        />
                    </View>
                    {!!error && <Text style={classes.error}>{error}</Text>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const componentName = 'TextInput';
export const TextInput: React.ComponentType<TextInputProps> = createStyles( styles, componentName, CTextInput );
