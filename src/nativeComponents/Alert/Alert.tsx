import * as React from 'react';
import Dialog, { DialogContent, DialogContentText, DialogTitle, DialogActions } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { View } from "../../primitives/View/View";
import { AlertData, showAlert, hideAlert } from "../../redux/reducers/navigation";
import { appTheme} from '../../utils/theme';
import { WithStyles } from "../../utils/theme.types";
import {Button, createStyles} from "../..";

const styles = () => ({
    dataContainer: {
        flexDirection: 'column',
    },
    title: {
        marginTop: appTheme.defaultMargin,
        marginLeft: appTheme.defaultMargin,
        marginRight: appTheme.defaultMargin,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '500',
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '400',
    },
    button: {
        paddingTop: appTheme.defaultVerticalMargin,
        paddingBottom: appTheme.defaultVerticalMargin,
        paddingLeft: appTheme.defaultHorizontalMargin,
        paddingRight: appTheme.defaultHorizontalMargin,
    },
    buttonLabel: {
        fontSize: 16,
    },
});


export interface ConnectedProps {
    alerts: Array<AlertData>,

    showAlert: typeof showAlert,
    hideAlert: typeof hideAlert,
}

export interface Props {
    alertId: string,
    title?: string,
    leftButtonText?: string, // if leftButtonText is passed in showDialog action, it will overwrite this prop
    rightButtonText?: string, // if rightButtonText is passed in showDialog action, it will overwrite this prop
    leftButtonOnPress?: () => void,
    rightButtonOnPress?: () => void,
}

class CAlert extends React.Component<Props & ConnectedProps & WithStyles, {}> {
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
        } = this.props;
        return alerts
            .filter( alert => alert.alertId === alertId)
            .map( ({visible, body, bodyData}, index) => (
                <Dialog
                    key={index}
                    onClose={hideAlert.bind(this, body, alertId)}
                    open={visible}
                    fullWidth={true}
                >
                    <View style={classes.dataContainer}>

                        {
                            title &&
                            <DialogTitle>
                                {
                                    typeof title === 'string' ? title : title
                                }
                            </DialogTitle>
                        }
                        {
                            body &&
                            <DialogContent>
                                {
                                    typeof body === 'string'
                                        ? <DialogContentText>
                                            {body}
                                        </DialogContentText>
                                        : body
                                }
                            </DialogContent>
                        }
                    </View>
                    {
                        <DialogActions>
                            {
                                leftButtonText &&
                                <Button
                                    // style={singleButton ? classes.singleButton : classes.button}
                                    // labelStyle={classes.buttonLabel}
                                    title={leftButtonText}
                                    // labelColor={appTheme.primaryColor}
                                    onPress={() => {
                                        leftButtonOnPress && leftButtonOnPress();
                                        hideAlert(body, alertId);
                                    }}
                                />
                            }
                            {
                                rightButtonText &&
                                <Button
                                    // style={singleButton ? classes.singleButton : classes.button}
                                    // labelStyle={classes.buttonLabel}
                                    title={rightButtonText}
                                    // labelColor={appTheme.primaryColor}
                                    onPress={() => {
                                        rightButtonOnPress && rightButtonOnPress();
                                        hideAlert(body, alertId);
                                    }}
                                />
                            }
                        </DialogActions>
                    }
                </Dialog>
            ));
    }
}

export const Alert: React.ComponentType<Props> = connect(
    ( state: any) => ({
        alerts: state.navigation.alerts,
    }), {
        showAlert,
        hideAlert,
    }
)(
    createStyles(styles, 'Alert')(CAlert)
);
