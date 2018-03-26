import * as React from "react";
import {Modal} from 'react-native';
import {connect} from "react-redux";
import {android, appTheme, ios} from "../../utils/theme";
import { WithStyles } from "../../utils/theme.types";
import {Button} from "../Button/Button";
import {View} from "../../primitives/View/View";
import { Text } from '../../primitives/Text/Text';
import { AlertProps } from "./Alert.types";
import { createStyles, isIOS } from "../..";
import {AlertData, hideAlert} from "../../redux/reducers/navigation";

let styles = () => ({
    dialog: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataContainer: {
        width: '80%',
        borderRadius: {
            [ios]: 14,
            [android]: 4,
        },
        backgroundColor: 'rgb(255,255,255)',
        flexDirection: 'column',
    },
    title: {
        marginTop: appTheme.horizontalMargin,
        marginLeft: appTheme.horizontalMargin,
        marginRight: appTheme.horizontalMargin,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
    },
    body: {
        marginTop: appTheme.horizontalMargin,
        marginLeft: appTheme.horizontalMargin,
        marginRight: appTheme.horizontalMargin,
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '400',
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        [android]: {
            marginTop: appTheme.horizontalMargin,
            justifyContent: 'flex-end',
            marginRight: 8,
            marginBottom: 8,
        },
        [ios]: {
            alignItems: "center",
        },
    },
    button: {
        [ios]: {
            width: '50%',
            paddingTop: 12,
            paddingBottom: 12,
            // alignSelf: "center",
        },
        [android]: {
            elevation: 0,
            paddingTop: appTheme.defaultVerticalMargin,
            paddingBottom: appTheme.defaultVerticalMargin,
            paddingLeft: appTheme.defaultHorizontalMargin,
            paddingRight: appTheme.defaultHorizontalMargin,
        }
    },
    singleButton: {
        [ios]: {
            width: '100%',
            paddingTop: 12,
            paddingBottom: 12,
            // alignSelf: "center",
        },
        [android]: {
            elevation: 0,
            paddingTop: appTheme.defaultVerticalMargin,
            paddingBottom: appTheme.defaultVerticalMargin,
            paddingLeft: appTheme.defaultHorizontalMargin,
            paddingRight: appTheme.defaultHorizontalMargin,
        }
    },
    buttonLabel: {
        [ios]: {
            width: '100%',
            fontSize: 17,
        },
        [android]: {
            fontSize: 16,
        }
    },
    buttonHorizontalDivider: {
        marginTop: appTheme.horizontalMargin,
        backgroundColor: '#ccc',
        height: appTheme.dividerSize,
        width: '100%',
    },
    buttonVerticalDivider: {
        backgroundColor: '#ccc',
        height: '100%',
        width: appTheme.dividerSize,
    }
});

export interface ConnectedProps {
    alerts: Array<AlertData>,

    hideAlert: typeof hideAlert,
}


const getTextComponent = (value: any, style: any) => {
    if (typeof value === 'string') {
        return <Text style={style}>{value}</Text>;
    }
    return value;
};

class CAlert extends React.Component<AlertProps & ConnectedProps & WithStyles, {}> {
    render() {
        const {
            classes,
            alertId,
            alerts,
            title,
            hideAlert,
            leftButtonText,
            leftButtonOnPress,
            rightButtonText,
            rightButtonOnPress,
            styles,
            children
        } = this.props;

        return (
            <View>
            {
                alerts
                    .filter(alert => alert.alertId === alertId)
                    .map(({visible, body, bodyData}, index) => (
                            <Modal
                                key={index}
                                transparent={true}
                                visible={visible}
                                onRequestClose={hideAlert.bind(this, body, alertId)}
                                animationType={'fade'}
                            >
                                <View style={classes.dialog}>
                                    <View style={classes.dataContainer}>

                                        {
                                            title &&
                                            <View style={classes.title}>
                                                {
                                                    getTextComponent(title, classes.titleText)
                                                }
                                            </View>
                                        }
                                        {
                                            body &&
                                            <View style={classes.body}>
                                                {
                                                    getTextComponent(body, classes.bodyText)
                                                }
                                            </View>
                                        }
                                        {isIOS && <View style={classes.buttonHorizontalDivider}/>}
                                        <View style={classes.buttonsContainer}>
                                            {
                                                leftButtonText &&
                                                <Button
                                                    // touchableStyle={!isIOS ? null : (singleButton ? classes.singleButton : classes.button)}
                                                    // style={isIOS ? null : (singleButton ? classes.singleButton : classes.button)}
                                                    // labelStyle={classes.buttonLabel}
                                                    styles={styles}
                                                    title={leftButtonText}
                                                    labelColor={appTheme.primaryColor}
                                                    onPress={() => {
                                                        leftButtonOnPress && leftButtonOnPress();
                                                        hideAlert(body, alertId);
                                                    }}
                                                />
                                            }
                                            {
                                                isIOS && leftButtonText && rightButtonText &&
                                                <View style={classes.buttonVerticalDivider}/>
                                            }
                                            {
                                                rightButtonText &&
                                                <Button
                                                    // touchableStyle={!isIOS ? null : (singleButton ? classes.singleButton : classes.button)}
                                                    // style={isIOS ? null : (singleButton ? classes.singleButton : classes.button)}
                                                    // labelStyle={classes.buttonLabel}
                                                    title={rightButtonText}
                                                    styles={styles}
                                                    labelColor={appTheme.primaryColor}
                                                    onPress={() => {
                                                        rightButtonOnPress && rightButtonOnPress();
                                                        hideAlert(body, alertId);
                                                    }}
                                                />
                                            }
                                            {children}
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        )
                    )
            }
            </View>
        );
    }
}

const componentName = 'Alert';
const StyledAlert: React.ComponentType<AlertProps & ConnectedProps> = createStyles(styles, componentName)(CAlert);
export default StyledAlert;

export const Alert = connect(
    ( state: any) => ({
        alerts: state.navigation.alerts,
    }),
    {
        hideAlert
    }

)(StyledAlert) as React.ComponentType<AlertProps>;
