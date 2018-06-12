import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import * as React from 'react';
import { appTheme, createStyles, View, WithStyles } from "../..";

const styles = () => ({
    drawerPaper: {
        height: '100%',
        width: appTheme.drawerWidth,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    drawerDocked: {
        height: '100%',
    },
    persistentDrawerDocked: {
        height: '100%',
        width: appTheme.persistentDrawerWidth,
    },
    closePersistentDrawer: {
        position: 'absolute',
        right: appTheme.marginM,
        top: appTheme.marginM,
    },
});

export interface DrawerProps {
    persistent?: boolean,
    open?: boolean,
    onDrawerClose?: () => void,
}

class CDrawerWeb extends React.PureComponent<DrawerProps & WithStyles, {}> {
    render() {
        const {
            children,
            classes,
            open,
            onDrawerClose,
            persistent,
        } = this.props;
        return (
            <Drawer
                variant={persistent ? "persistent" : "temporary"}
                classes={{
                    paper: classes.drawerPaper as any,
                    docked: persistent
                        ? classes.persistentDrawerDocked as any
                        : classes.drawerDocked as any,
                }}
                open={open}
                onClose={onDrawerClose}
            >
                {children}
                {
                    persistent && open &&
                    <View style={classes.closePersistentDrawer}>
                        <IconButton
                            onClick={!!onDrawerClose
                                ? () => onDrawerClose()
                                : () => {}
                            }
                        >
                            <ChevronLeftIcon/>
                        </IconButton>
                    </View>
                }
            </Drawer>
        );
    }
}

export const DrawerWeb: React.ComponentType<DrawerProps> = createStyles( styles, 'DrawerWeb' )( CDrawerWeb );
