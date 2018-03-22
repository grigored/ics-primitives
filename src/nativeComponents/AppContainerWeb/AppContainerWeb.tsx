import MenuIcon from 'material-ui-icons/Menu';
import * as React from 'react';
import { connect } from 'react-redux';
import { appTheme, createStyles, View, WithStyles } from '../..';
import { DialogData, hideDialog, removeDialog, toggleDrawer, routes } from '../../redux/reducers/navigation';
import { web } from '../../utils/theme';
import { Dialog } from '../Dialog/Dialog';
import { DrawerWeb } from '../DrawerWeb/DrawerWeb';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';
import { Topbar } from '../Topbar/Topbar';
import { TopbarListButtonData, TopbarSimpleButtonData } from '../Topbar/Topbar.types';

const styles = () => ({
    appFrame: {
        fontFamily: 'Roboto',
        flex: 1,
        width: '100vw',
        height: '100vh',
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
    dialogs: Array<DialogData>,
    drawerOpen: boolean,
    persistComplete: boolean,

    toggleDrawer: typeof toggleDrawer,
    hideDialog: typeof hideDialog,
    removeDialog: typeof removeDialog,
}

class CAppContainerWeb extends React.PureComponent<WithStyles & AppProps & ConnectedProps> {

    render() {
        const {
            classes,
            children,
            dialogs,
            drawerContent,
            drawerOpen,
            drawerPersistent,
            onDrawerClose,
            rightButtonsData,
            title,
            toggleDrawer,
            hideDialog,
            removeDialog,
            persistComplete,
        } = this.props;

        if (!persistComplete) {
            return null;
        }

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
                    </View>
                </View>
                {
                    dialogs.map(dialog => {
                        let routeName = Object.keys(routes).filter(routeName => routes[routeName].screen === dialog.dialogId)[0],
                            dialogData = routes[routeName];
                            // fullScreen = dialog.fullScreen;

                        // if (fullScreen === false && !isXs()) {
                        //     const Body = dialogData.container;
                        //     return (
                        //         <AlertComponent
                        //             key={dialog.dialogId}
                        //             visible={dialog.visible}
                        //             title={dialog.nonUrlProps && dialog.nonUrlProps.title}
                        //             body={<Body
                        //                 urlProps={dialog.urlProps}
                        //                 nonUrlProps={dialog.nonUrlProps}
                        //             />}
                        //             hideAlert={() => hideDialog(dialog.dialogId)}
                        //             showButtons={false}
                        //         />
                        //     );
                        // }
                        return (
                            <Dialog
                                fullScreen={dialog.fullScreen}
                                key={dialog.dialogId}
                                visible={dialog.visible}
                                body={dialogData.container}
                                hideDialog={() => hideDialog(dialog.dialogId)}
                                removeDialog={() => removeDialog(dialog.dialogId)}
                            />
                        );
                    })
                }
            </ThemeProvider>
        );
    }
}


export const AppContainerWeb: React.ComponentType<AppProps> = connect(
    ( state: any ) => ({
        drawerOpen: state.navigation.drawerOpen,
        dialogs: state.navigation.dialogs,
        persistComplete: state.persisted.persistComplete,
    }), {
        toggleDrawer,
        hideDialog,
        removeDialog,
    }
)(
    createStyles(styles, 'AppContainerWeb')(CAppContainerWeb)
);
