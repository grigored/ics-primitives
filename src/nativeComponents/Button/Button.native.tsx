'use strict';
import * as React from 'react';
import {ButtonProps} from "./Button.types";
import {android, appTheme, all} from "../../utils/theme";
import {createStyles, WithStyles, Image, Text, Touchable, View} from "../..";


const styles = () => ({
    button: {
        [android]: {
            elevation: 4,
            borderRadius: 2,
            flexDirection: 'row',
        },
        [all]: {
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },

    },
    disabledView: {
        backgroundColor: '#a1a1a1',
        [android]: {
            elevation: 0,
        },
    },
    disabledText: {
        color: '#cdcdcd',
    },

    primaryView: {
        backgroundColor: appTheme.primaryColor,
    },
    primaryText: {
        color: appTheme.primaryTextColor,

    },
    text: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14,
    },
    shadowedButton: {
        [android]: {},
        [all]: {
            shadowColor: '#000',
            // shadowOffset: {
            //     width: 0,
            //     height: 2
            // },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
    },
    iconStyle: {
        width: 24,
        height: 24,
        marginLeft: 16,
        marginRight: 16,
    }
});

const CButton: React.StatelessComponent<ButtonProps & WithStyles> = ({
    children,
    classes,
    disabled,
    icon,
    onPress,
    primary,
    raised,
    styles,
    title,
}) => {

    // use TouchableComponent for Ripple effect
    return (
        <Touchable
            disabled={disabled}
            activeOpacity={0.3}
            onPress={onPress}
            underlayColor={'transparent'}
            style={[
                classes.button,
                disabled && classes.disabledView,
                raised && classes.shadowedButton,
                primary && classes.primaryView,
                styles && styles.root
            ]}
        >
            <View>
                {
                    icon &&
                    <Image
                        style={[classes.iconStyle, styles && styles.icon]}
                        source={icon}
                    />
                }
                {!!title
                    ? <Text
                        style={[
                            classes.text,
                            primary && classes.primaryText,
                            disabled && classes.disabledText,
                            styles && styles.label
                        ]}>
                        {title}
                    </Text>
                    : null
                }
                {children}
            </View>
        </Touchable>
    );
};

const componentName = 'Button';
export const Button = createStyles(styles, componentName, CButton);
