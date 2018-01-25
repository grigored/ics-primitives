import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {Button} from "../Button/Button";
import {appTheme, createStyles, WithStyles} from "../..";
import {getStyleProps} from "../../utils/web";
import {TopbarProps} from "./Topbar.types";

const styles = () => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'absolute',
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

            <Typography type="title" color="inherit" className={classes.flex as string}>
                {title || ''}
            </Typography>

            {rightButtonsData && rightButtonsData.map(buttonData =>
                !!buttonData.items
                    ? <Button
                        key={buttonData.title}
                        icon={buttonData.icon}
                        title={buttonData.title}
                        onPress={() => {}}
                        // items={buttonData.items}
                    />
                    : <Button
                        key={buttonData.title}
                        onPress={buttonData.onClick}
                        title={buttonData.title}
                        href={buttonData.href}
                        styles={{
                            label: classes.buttonColor,
                        }}
                    />
            )}

        </Toolbar>
    </AppBar>
);

export const Topbar = createStyles<TopbarProps>(styles, 'Topbar', CTopBar);
