import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { all, appTheme, createStyles, isXs, View, webDesktop, WithStyles } from "../..";
import { TopbarListButtonData, TopbarSimpleButtonData } from "../../nativeComponents/Topbar/Topbar.types";
import { getStyleProps } from "../../utils/web";
import { Button } from "../Button/Button";
import { TopbarProps } from "./Topbar.types";

const styles = () => ( {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'fixed',
        backgroundColor: appTheme.topBarColor,
        height: {
            [webDesktop]: appTheme.topBarHeightDesktop,
            [all]: appTheme.topBarHeightMobile,
        },
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
    },
    toolbar: {
        minHeight: 0,
        height: {
            [webDesktop]: appTheme.topBarHeightDesktop,
            [all]: appTheme.topBarHeightMobile,
        },
    },
} );

const CTopBar = ( {
                      classes,
                      drawerOpen,
                      leftButtonIcon,
                      leftButtonOnPress,
                      rightButtonsData,
                      title,
                      topbarContent,
                  }: TopbarProps & WithStyles ) => (
    <AppBar {...getStyleProps( [classes.appBar/*, drawerOpen && classes.appBarShift*/] )}>
        <Toolbar
            style={{
                minHeight: 0,
                height: isXs() ? appTheme.topBarHeightMobile : appTheme.topBarHeightDesktop,
            }}
        >
            {
                leftButtonIcon &&
                <IconButton aria-label="Menu" onClick={leftButtonOnPress}>
                    {leftButtonIcon}
                </IconButton>
            }
            {
                typeof title === 'string'
                    ? (
                        <Typography variant="title" color="inherit" className={classes.flex as string}>
                            {title || ''}
                        </Typography>
                    )
                    : title
            }

            <View
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: isXs() ? appTheme.topBarHeightMobile : appTheme.topBarHeightDesktop,
                }}>
                {
                    rightButtonsData && rightButtonsData.map( buttonData => {
                        if (( buttonData as TopbarListButtonData ).items) {
                            let bd = buttonData as TopbarListButtonData;
                            return (
                                <Button
                                    key={bd.title}
                                    title={bd.title}
                                    backgroundColor={
                                        appTheme.topbarButtonColor ||
                                        appTheme.topbarColor ||
                                        appTheme.primaryColor
                                    }
                                    labelColor={
                                        appTheme.topbarTextColor ||
                                        appTheme.topbarContrastColor ||
                                        appTheme.primaryTextColor
                                    }
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
                                    iconLeft={bd.icon}
                                    href={bd.href}
                                    styles={{
                                        label: classes.buttonColor,
                                    }}
                                    backgroundColor={
                                        appTheme.topbarButtonColor ||
                                        appTheme.topbarColor ||
                                        appTheme.primaryColor
                                    }
                                    labelColor={
                                        appTheme.topbarTextColor ||
                                        appTheme.topbarContrastColor ||
                                        appTheme.primaryTextColor
                                    }
                                />
                            );
                        }
                    } )
                }
                {
                    topbarContent && topbarContent.map( x => x )
                }
            </View>
        </Toolbar>
    </AppBar>
);

export const Topbar: React.ComponentType<TopbarProps> = createStyles( styles, 'Topbar' )( CTopBar );
