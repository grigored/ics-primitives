import * as React from 'react';
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from 'react-redux';
import { compose } from "redux";
import { View } from "../../primitives/View/View";
import { AlertData, hideAlert } from "../../redux/reducers/navigation";
import { appTheme } from '../../utils/theme';
import { WithStyles } from "../../utils/theme.types";
import { Button, createStyles } from "../..";
import { AlertProps } from "./Alert.types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

const styles = () => ( {
    dataContainer: {
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
} );


export interface ConnectedProps {
    alerts: Array<AlertData>,

    hideAlert: typeof hideAlert,
}

class CAlert extends React.Component<AlertProps & ConnectedProps & WithStyles & InjectedTranslateProps, {}> {
    render() {
        const {
            classes,
            alertId,
            alerts,
            title,
            hideAlert,
            onClose,
            leftButtonText,
            leftButtonOnPress,
            rightButtonText,
            rightButtonOnPress,
            t,
        } = this.props;
        return alerts
            .filter( alert => alert.alertId === alertId )
            .map( ( { visible, body, bodyData }, index ) => (
                <Dialog
                    key={index}
                    onClose={() => {
                        onClose && onClose();
                        hideAlert( body, alertId );
                    }}
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
                                            {t( body )}
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
                                        hideAlert( body, alertId );
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
                                        hideAlert( body, alertId );
                                    }}
                                />
                            }
                        </DialogActions>
                    }
                </Dialog>
            ) );
    }
}

const StyledAlert: React.ComponentType<AlertProps & ConnectedProps & InjectedTranslateProps> = createStyles( styles, 'Alert' )( CAlert );
export default StyledAlert;

export const Alert = compose(
    translate(),
    connect(
        ( state: any ) => ( {
            alerts: state.navigation.alerts,
        } ), {
            hideAlert,
        }
    ),
)( StyledAlert ) as React.ComponentType<AlertProps>;
