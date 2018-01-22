import * as React from "react";
import MaterialButton from "material-ui/Button";
import {StyleRules, WithStyles} from 'material-ui/styles';
import {BUTTON_TYPE} from "../enums";
import {Image, Text, View} from "../..";
import {ButtonProps} from "./Button.types";
import {appTheme} from "../../utils/theme";
import {createStyles} from "../../primitives/createStyles/createStyles";
import {getStyleProps} from "../../utils/web";

type ClassNames =
    | 'iconStyle'
    | 'labelStyle'
    | 'touchableStyle';

const styles: StyleRules<ClassNames> = {
    iconStyle: {
        width: 24,
        height: 24,
        marginLeft: 16,
        marginRight: 16,
    },
    labelStyle: {
        textAlign: 'center',
        // color: 'white',
        fontWeight: 500,
        margin: 'auto',
    },
    touchableStyle: {
        margin: 2,  // needed for shadow
        padding: 2,  // needed for shadow
    }
};


const CButton = ({
                     type,
                     onPress,
                     disabled,
                     style,
                     title,
                     labelColor,
                     backgroundColor,
                     icon,
                     iconStyle,
                     labelStyle,
                     touchableStyle,
                     classes,
                     children,
                 }: ButtonProps & WithStyles) => {
    return (
        <MaterialButton
            {...getStyleProps([
                classes.touchableStyle,
                touchableStyle,
                {
                    color: labelColor ? labelColor : (type === BUTTON_TYPE.RAISED ? appTheme.primaryTextColor : null),
                    backgroundColor: backgroundColor ? backgroundColor : (type === BUTTON_TYPE.RAISED ? appTheme.primaryColor : null),

                }
            ])}
            raised={type === BUTTON_TYPE.RAISED}
            onClick={onPress}
            disabled={disabled}
        >
            {
                children
                    ? children
                    : <View style={style}>
                        {
                            typeof title === 'string'
                                ? <Text style={[labelStyle, labelColor && {color: labelColor}]}>
                                    {title}
                                </Text>
                                : title
                        }
                        {
                            icon &&
                            <View style={[iconStyle, classes.iconStyle]}>
                                <Image
                                    source={icon}
                                />
                            </View>
                        }
                    </View>
            }
        </MaterialButton>
    );
};

const componentName = 'Button';
export const Button = createStyles<ButtonProps>(styles, componentName, CButton);
