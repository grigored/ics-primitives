import * as React from 'react';
import MenuIcon from 'material-ui-icons/Menu';
import {connect} from 'react-redux';
import {appTheme, createStyles, View, WithStyles} from "../..";
import {Topbar} from "../Topbar/Topbar";
import {DrawerWeb} from '../DrawerWeb/DrawerWeb';
import {web} from "../../utils/theme";
import {ThemeProvider} from "../ThemeProvider/ThemeProvider";
import {TopbarListButtonData, TopbarSimpleButtonData} from "../Topbar/Topbar.types";
import {toggleDrawer} from "../../redux/reducers/navigation";

const styles = () => ({
    appFrame: {
        fontFamily: 'Roboto',
        flex: 1,
    },
    appBarShift: {
        marginLeft: appTheme.drawerWidth,
        width: `calc(100% - ${appTheme.drawerWidth}px)`,
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
        position: 'relative',
        overflow: 'hidden',
        marginTop: {
            [web]: appTheme.topBarHeight
        },
    },
    drawerPaper: {
        height: '100%',
        width: appTheme.drawerWidth,
        overflow: 'hidden',
        backgroundColor: '#fff'
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
    drawerPersistent?: boolean,
    onDrawerClose?: () => void,
    rightButtonsData?: Array<TopbarSimpleButtonData | TopbarListButtonData>,
    title?: React.ReactNode | string,
}

export interface ConnectedProps {
    drawerOpen: boolean,
    toggleDrawer: typeof toggleDrawer,
}

class CAppContainerWeb extends React.PureComponent<WithStyles & AppProps & ConnectedProps> {

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
            toggleDrawer,
        } = this.props;
        return (
            <ThemeProvider>
                <View style={classes.appFrame} name={'AppFrame'}>
                    <Topbar
                        leftButtonIcon={<MenuIcon style={{color: appTheme.topbarContrastColor}}/>}
                        leftButtonOnPress={toggleDrawer.bind(this, null, !drawerOpen)}
                        drawerOpen={!!drawerOpen}
                        title={title}
                        rightButtonsData={rightButtonsData}
                    />

                    <DrawerWeb
                        persistent={drawerPersistent}
                        open={drawerOpen}
                        onDrawerClose={onDrawerClose || toggleDrawer.bind(this, null, false)}
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



export const AppContainerWeb = connect(
    (state: any) => ({
        drawerOpen: state.navigation.drawerOpen,
    }), {
        toggleDrawer,
    }
)(
    createStyles<AppProps & ConnectedProps>(styles, "AppContainerWeb", CAppContainerWeb)
);
