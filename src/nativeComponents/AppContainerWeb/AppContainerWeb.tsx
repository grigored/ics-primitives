import * as React from 'react';
import {appTheme, createStyles, View, WithStyles} from "../..";
import {webDesktop} from "../../utils/theme";
import {Topbar} from "../Topbar/Topbar";
import {DrawerWeb} from '../DrawerWeb/DrawerWeb';

const styles = () => ({
    appFrame: {
        position: 'absolute',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        width: '100%',
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
        [webDesktop]: {
            marginTop: appTheme.topBarHeight,
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
}

class CAppContainerWeb extends React.PureComponent<WithStyles & AppProps> {

    render() {
        const {classes, children, drawerContent, drawerOpen, drawerPersistent, onDrawerClose } = this.props;
        return (
            <View style={classes.appFrame}>
                <Topbar
                    // leftButtonIcon={(isXs() || isAdmin(userData)) &&
                    // <MenuIcon style={{color: appTheme.topbarContrastColor}}/>}
                    // leftButtonOnPress={toggleDrawer.bind(this, null, !drawerOpen)}
                    drawerOpen={!!drawerOpen}
                    title={"ASD"}
                    // rightButtonsData={!isXs() && this.getRightMenuButtonData()}
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

        );
    }
}

export const AppContainerWeb = createStyles(styles, "AppContainerWeb", CAppContainerWeb);