import MenuIcon from 'material-ui-icons/Menu';
import * as React from 'react';
import { connect } from 'react-redux';
import { appTheme, createStyles, View, webDesktop, webMobile, WithStyles } from '../..';
import { DEFAULT_ALERT_ID, toggleDrawer } from '../../redux/reducers/navigation';
import { Alert } from '../Alert/Alert';
import { DrawerWeb } from '../DrawerWeb/DrawerWeb';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';
import { Topbar } from '../Topbar/Topbar';
import { TopbarListButtonData, TopbarSimpleButtonData } from '../Topbar/Topbar.types';

const styles = () => ( {
    appFrame: {
        fontFamily: 'Roboto',
        flex: 1,
        width: '100vw',
        height: '100vh',
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
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
            [webDesktop]: appTheme.topBarHeightDesktop,
            [webMobile]: appTheme.topBarHeightMobile,
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
} );


export interface AppProps {
    drawerContent?: React.ReactNode,
    drawerPersistent?: boolean,
    onDrawerClose?: () => void,
    rightButtonsData?: Array<TopbarSimpleButtonData | TopbarListButtonData>,
    title?: React.ReactNode | string,
    topbarContent?: Array<any>
}

export interface ConnectedProps {
    drawerOpen: boolean,
    persistComplete: boolean,

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
            persistComplete,
            topbarContent,
        } = this.props;

        if (!persistComplete) {
            return null;
        }

        return (
            <ThemeProvider>
                <View style={classes.appFrame} name={'AppFrame'}>
                    <Topbar
                        leftButtonIcon={
                            <MenuIcon
                                style={{ color: appTheme.topbarContrastColor || appTheme.primaryTextColor }}
                            />
                        }
                        leftButtonOnPress={toggleDrawer.bind( this, null, !drawerOpen )}
                        drawerOpen={!!drawerOpen}
                        title={title}
                        rightButtonsData={rightButtonsData}
                        topbarContent={topbarContent}
                    />

                    <DrawerWeb
                        persistent={drawerPersistent}
                        open={drawerOpen}
                        onDrawerClose={onDrawerClose || toggleDrawer.bind( this, null, false )}
                    >
                        {drawerContent}
                    </DrawerWeb>
                    <View style={[
                        classes.content,
                        drawerOpen && classes.contentShift,
                        drawerPersistent && classes.contentPersistent,
                    ]}>
                        {children}
                    </View>
                </View>
                <Alert alertId={DEFAULT_ALERT_ID} leftButtonText={"OK"}/>
            </ThemeProvider>
        );
    }
}


export const AppContainerWeb: React.ComponentType<AppProps> = connect(
    ( state: any ) => ( {
        drawerOpen: state.navigation.drawerOpen,
        persistComplete: state.persisted.persistComplete,
    } ), {
        toggleDrawer,
    }
)(
    createStyles( styles, 'AppContainerWeb' )( CAppContainerWeb )
);
