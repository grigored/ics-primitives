import * as React from 'react';
import { compose } from 'redux';
import { createStyles, getTestProps, Image, Testable, Text, Touchable, View, WithStyles } from '../..';
import { isIOS } from '../../primitives/platform/platform';
import { all, android, appTheme } from '../../utils/theme';
import { ButtonProps } from './Button.types';

export { fade } from '@material-ui/core/styles/colorManipulator';

const styles = () => ( {
    button: {
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRaised: {
        [android]: {
            elevation: 4,
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
} );

class CButton extends React.PureComponent<ButtonProps & WithStyles & Testable, {}> {
    render() {
        const {
            children, classes, disabled, iconLeft, iconRight, onPress, primary, raised, styles, title,
            backgroundColor, labelColor,
        } = this.props;
        let buttonStyle = ( styles && styles.root ) || {},
            labelStyle = ( styles && styles.label ) || {};

        // if (backgroundColor) {
        //     buttonStyle.backgroundColor = backgroundColor;
        // }
        // if (labelColor) {
        //     labelStyle.color = labelColor;
        // }

        const containerStyle = [
            classes.button,
            buttonStyle,
            !!backgroundColor ? { backgroundColor } : {},
        ];
        // use TouchableComponent for Ripple effect
        return (
            <Touchable
                disabled={disabled}
                activeOpacity={0.3}
                onPress={onPress}
                underlayColor={'transparent'}
                style={[
                    raised && classes.buttonRaised,
                    disabled && classes.disabledView,
                    raised && classes.shadowedButton,
                    isIOS && primary && classes.primaryView,
                    ...( isIOS ? containerStyle : [] ),
                ]}
                {...getTestProps(this.props.testId)}
            >
                <View
                    style={isIOS ? undefined : [containerStyle, primary && classes.primaryView]}
                >
                    {
                        iconLeft &&
                        <Image
                            style={[classes.iconStyle, styles && styles.iconLeft]}
                            source={iconLeft}
                        />
                    }
                    {!!title &&
                    <Text
                        style={[
                            classes.text,
                            primary && classes.primaryText,
                            disabled && classes.disabledText,
                            labelStyle,
                            !!labelColor ? { color: labelColor } : {}
                        ]}
                    >
                        {title}
                    </Text>
                    }
                    {
                        iconRight &&
                        <Image
                            style={[classes.iconStyle, styles && styles.iconRight]}
                            source={iconRight}
                        />
                    }
                    {children}
                </View>
            </Touchable>
        );
    }
}

const componentName = 'Button';
export const Button: React.ComponentType<ButtonProps & Testable> = compose(
    createStyles( styles, componentName ),
)( CButton );
