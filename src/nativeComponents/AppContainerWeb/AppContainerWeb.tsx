import * as React from 'react';
import {appTheme, createStyles, View, WithStyles} from "../..";
import {Topbar} from "../Topbar/Topbar";
import {DrawerWeb} from '../DrawerWeb/DrawerWeb';
import {web} from "../../utils/theme";
import {ThemeProvider} from "../ThemeProvider/ThemeProvider";
import {TopbarListButtonData, TopbarSimpleButtonData} from "../Topbar/Topbar.types";

const styles = () => ({
    appFrame: {
        fontFamily: 'Roboto',
        flex: 1,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    content: {
        display: 'flex',
        width: '100%',
        flexGrow: 1,
        // backgroundColor: muiTheme.palette.background.default,
        // transition: muiTheme.transitions.create('margin', {
        //     easing: muiTheme.transitions.easing.sharp,
        //     duration: muiTheme.transitions.duration.leavingScreen,
        // }),
        // marginTop: 56,
        position: 'relative',
        overflow: 'hidden',
        marginTop: {
            [web]: appTheme.topBarHeight
        },
    },
    contentPersistent: {
        marginLeft: -appTheme.drawerWidth,
    },
    contentShift: {
        marginLeft: 0,
        // transition: muiTheme.transitions.create('margin', {
        //     easing: muiTheme.transitions.easing.easeOut,
        //     duration: muiTheme.transitions.duration.enteringScreen,
        // }),
    },
    logo: {
        height: 48,
        width: 'auto',
    },
});


export interface AppProps {
    drawerContent?: React.ReactNode,
    drawerOpen?: boolean,
    drawerPersistent?: boolean,
    onDrawerClose?: () => void,
    rightButtonsData?: Array<TopbarSimpleButtonData | TopbarListButtonData>,
    title?: React.ReactNode | string,
}

class CAppContainerWeb extends React.PureComponent<WithStyles & AppProps> {

    render() {
        const {
            classes,
            children,
            drawerContent,
            drawerOpen,
            drawerPersistent,
            onDrawerClose,
            rightButtonsData,
            title,
        } = this.props;
        return (
            <ThemeProvider>
                <View style={classes.appFrame} name={'AppFrame'}>
                    <Topbar
                        // leftButtonIcon={(isXs() || isAdmin(userData)) &&
                        // <MenuIcon style={{color: appTheme.topbarContrastColor}}/>}
                        // leftButtonOnPress={toggleDrawer.bind(this, null, !drawerOpen)}
                        drawerOpen={!!drawerOpen}
                        title={title}
                        rightButtonsData={rightButtonsData}
                    />

                    <DrawerWeb
                        persistent={drawerPersistent}
                        open={drawerOpen}
                        onDrawerClose={onDrawerClose}
                    >
                        {drawerContent}
                    </DrawerWeb>
                    <View style={[
                        classes.content,
                        drawerOpen && classes.contentShift,
                        drawerPersistent && classes.contentPersistent,
                    ]}>
                        {children}
                        {/*{Object.values(routeDefinitions).map(routeData =>*/}
                        {/*<Route*/}
                        {/*key={routeData.screen}*/}
                        {/*path={'/' + routeData.screen + (routeData.webRouteParam || '')}*/}
                        {/*component={routeData.container}*/}
                        {/*/>*/}
                        {/*)}*/}
                        {/*{!routeDefinition && "unknown route"}*/}
                    </View>
                </View>
            </ThemeProvider>
        );
    }
}

export const AppContainerWeb = createStyles<AppProps>(styles, "AppContainerWeb", CAppContainerWeb);