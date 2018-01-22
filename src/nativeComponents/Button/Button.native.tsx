'use strict';
import * as React from 'react';
import {BUTTON_TYPE} from "../enums";
import {ButtonProps} from "./Button.types";
import {android, appTheme, ios} from "../../utils/theme";
import {createStyles, WithStyles, Image, Text, Touchable, View} from "../..";


const styles = () => ({
    button: {
        [ios]: {
            // height: 24,
            paddingLeft: 14,
            paddingRight: 14,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        [android]: {
            elevation: 4,
            borderRadius: 2,
            flexDirection: 'row',
        },
    },
    primaryView: {
        backgroundColor: appTheme.primaryColor,//'#f00',//theme.palette.primary[500],
    },
    primaryText: {
        color: 'white'

    },
    text: {
        [ios]: {
            color: appTheme.primaryColor,//'#f00',//theme.palette.primary[500],
            textAlign: 'center',
            // padding: 8,
            fontSize: 14,
            fontWeight: '500',
        },
        [android]: {
            textAlign: 'center',
            color: 'white',
            // padding: 8,
            fontWeight: '500',
        },
    },
    shadowedButton: {
        [ios]: {
            shadowColor: '#000',
            // shadowOffset: {
            //     width: 0,
            //     height: 2
            // },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
    },
    buttonDisabled: {
        [ios]: {
            backgroundColor: '#a1a1a1',
        },
        [android]: {
            elevation: 0,
            backgroundColor: '#a1a1a1',
        }
    },
    textDisabled: {
        [ios]: {
            color: '#cdcdcd',
        },
        [android]: {
            color: '#cdcdcd',
        }
    },
    iconStyle: {
        width: 24,
        height: 24,
        marginLeft: 16,
        marginRight: 16,
    }
});

const CButton = ({
                     labelColor,
                     backgroundColor,
                     onPress,
                     title,
                     disabled,
                     style,
                     labelStyle,
                     type,
                     classes,
                     icon,
                     iconStyle,
                     testProps,
                     touchableStyle,
                 }: ButtonProps & WithStyles) => {

    // use TouchableComponent for Ripple effect
    return (
        <Touchable
            {...(testProps || {})}
            testProps={testProps}
            disabled={disabled}
            activeOpacity={0.3}
            onPress={onPress}
            underlayColor={'transparent'}
            style={touchableStyle}
        >
            <View style={[
                classes.button,
                type === BUTTON_TYPE.RAISED && classes.shadowedButton,
                style,
                disabled && classes.buttonDisabled,
                !disabled && backgroundColor && {backgroundColor}
            ]}
            >
                {
                    icon &&
                    <Image
                        style={[classes.iconStyle, iconStyle]}
                        source={icon}
                    />
                }
                {
                    typeof title === 'string'
                        ? <Text
                            style={[
                                classes.text,
                                disabled && classes.textDisabled,
                                labelStyle,
                                !disabled && labelColor && {color: labelColor}
                            ]}>
                            {title}
                        </Text>
                        : title
                }
            </View>
        </Touchable>
    );
};

const componentName = 'Button';
export const Button = createStyles(styles, componentName, CButton);
