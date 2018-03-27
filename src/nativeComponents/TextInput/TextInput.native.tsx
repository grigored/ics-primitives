import * as React from 'react';
import { StyleProp, TextInput as TextInputNative, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { shallowEqual } from "src/utils/common";
import { android, appTheme, createStyles, ios, Text, View, WithStyles } from '../../';
import { defaultDbToRaw, defaultGetError, defaultRawToDb } from '../../nativeComponents/TextInput/TextInput.utils';
import { isIOS } from '../../primitives/platform/platform';
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { TEXT_INPUT_TYPES } from '../../utils/enums';
import { TextInputDBValue, TextInputProps } from './TextInput.types';


let styles = () => ( {
    containerLeft: {
        flexDirection: 'row',
        [ios]: {
            height: appTheme.inputHeight,
        },
        alignItems: 'center',
    },
    containerTop: {
        // flex: 1,
        flexDirection: 'column',
    },
    leftLabel: {
        fontWeight: '500',
        minWidth: 150,
        color: appTheme.textInputLabelColor,
    },
    topLabel: {
        color: appTheme.textInputLabelColor,
    },
    leftText: {
        flex: 1,
        height: appTheme.inputHeight,
        color: appTheme.textColor,
        [android]: {
            // textAlignVertical: 'top',
            fontSize: 16,
            // padding: 0,
            // margin: 0,
        },
        // height: appTheme.inputHeight,
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

type Props = TextInputProps & FieldStateProps<TextInputDBValue> & WithStyles

class CTextInput extends React.PureComponent<Props, { rawValue: string }> {
    static defaultProps = {
        labelPositionLeft: isIOS,
    };
    _rawValue: string = '';
    private inputRef: any;

    constructor( props: Props ) {
        super( props );
        let { value } = this.props;
        this._rawValue = ( value !== null && value !== undefined )
            ? this.getRawValue( value )
            : '';
    }

    getRawValue( dbValue: TextInputDBValue ) {
        let { dbToRaw, inputType = TEXT_INPUT_TYPES.TEXT } = this.props;
        return !!dbToRaw
            ? dbToRaw( dbValue )
            : defaultDbToRaw( inputType, dbValue );
    }

    getDbValue( rawValue: string ) {
        let { rawToDb, inputType = TEXT_INPUT_TYPES.TEXT } = this.props;
        return !!rawToDb
            ? rawToDb( rawValue )
            : defaultRawToDb( inputType, rawValue );
    }

    getError( rawValue: string ): string | undefined {
        let { extraErrorChecker, inputType } = this.props;
        return !!extraErrorChecker
            ? extraErrorChecker( rawValue )
            : defaultGetError( inputType, rawValue );
    }

    componentWillReceiveProps( nextProps: Props ) {
        let { value } = nextProps,
            dbValue = ( value !== null && value !== undefined && value.value !== null && value.value !== undefined )
                ? value.value
                : value,
            parsedRawValue = this.getDbValue( this._rawValue );

        let shouldChangeRawValue: boolean = ( typeof parsedRawValue !== typeof dbValue );

        if (typeof parsedRawValue == typeof dbValue) {
            if (typeof dbValue === 'object') {
                shouldChangeRawValue = !shallowEqual( parsedRawValue, dbValue );
            } else {
                shouldChangeRawValue = parsedRawValue !== dbValue;
            }
        }

        if (shouldChangeRawValue) {
            // this.props.field == 'theme' && console.log("SHOULD CHANGE RAW VALUE 'CUZ Y NOT");
            this._rawValue = ( dbValue !== null && dbValue !== undefined )
                ? this.getRawValue( dbValue )
                : '';
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
        } = this.props;

        return (
            <TouchableWithoutFeedback
                onPress={() => this.inputRef.focus()}
            >
                <View>
                    <View style={labelPositionLeft ? classes.containerLeft : classes.containerTop}>
                        <Text style={labelPositionLeft ? classes.leftLabel : classes.topLabel}>
                            {title}
                        </Text>
                        <TextInputNative
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            keyboardType={getKeyboardType( inputType )}
                            onChangeText={( rawValue: string ) => {
                                let dbValue = this.getDbValue( rawValue );
                                this._rawValue = rawValue;
                                this.forceUpdate();
                                let fieldError = this.getError( rawValue );
                                onChange && onChange( !!fieldError ? { value: dbValue, error: fieldError } : dbValue );

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
                            value={this._rawValue}
                        />
                    </View>
                    {!!error && <Text style={classes.error}>{error}</Text>}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const componentName = 'TextInput';
export const TextInput: React.ComponentType<TextInputProps> = createStyles( styles, componentName )( CTextInput );
