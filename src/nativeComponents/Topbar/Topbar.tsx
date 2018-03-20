import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {Button} from "../Button/Button";
import {appTheme, createStyles, WithStyles} from "../..";
import {getStyleProps} from "../../utils/web";
import {TopbarProps} from "./Topbar.types";
import {TopbarListButtonData, TopbarSimpleButtonData} from "src/nativeComponents/Topbar/Topbar.types";

const styles = () => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'fixed',
        backgroundColor: appTheme.primaryColor,
        // transition: muiTheme.transitions.create(['margin', 'width'], {
        //     easing: muiTheme.transitions.easing.sharp,
        //     duration: muiTheme.transitions.duration.leavingScreen,
        // }),
    },
    appBarShift: {
        marginLeft: appTheme.drawerWidth,
        width: `calc(100% - ${appTheme.drawerWidth}px)`,
        // transition: muiTheme.transitions.create(['margin', 'width'], {
        //     easing: muiTheme.transitions.easing.easeOut,
        //     duration: muiTheme.transitions.duration.enteringScreen,
        // }),
    },
    buttonColor: {
        color: appTheme.primaryTextColor,
    }
});

const CTopBar = ({
     classes,
     drawerOpen,
     leftButtonIcon,
     leftButtonOnPress,
     rightButtonsData,
     title,
}: TopbarProps & WithStyles) => (
    <AppBar {...getStyleProps([classes.appBar, drawerOpen && classes.appBarShift])}>
        <Toolbar>
            {
                leftButtonIcon &&
                <IconButton aria-label="Menu" onClick={leftButtonOnPress}>
                    {leftButtonIcon}
                </IconButton>
            }

            <Typography variant="title" color="inherit" className={classes.flex as string}>
                {title || ''}
            </Typography>

            {rightButtonsData && rightButtonsData.map(buttonData => {
                if ((buttonData as TopbarListButtonData).items) {
                    let bd = buttonData as TopbarListButtonData;
                    return (
                        <Button
                            key={bd.title}
                            title={bd.title}
                            // items={buttonData.items}
                        />
                    );
                } else {
                    let bd = buttonData as TopbarSimpleButtonData;
                    return (
                        <Button
                            key={bd.title}
                            onPress={bd.onPress}
                            title={bd.title}
                            href={bd.href}
                            styles={{
                                label: classes.buttonColor,
                            }}
                        />
                    );
                }
            })}
        </Toolbar>
    </AppBar>
);

export const Topbar: React.ComponentType<TopbarProps> = createStyles(styles, 'Topbar')(CTopBar);
