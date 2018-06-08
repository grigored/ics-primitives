import * as React from 'react';
import Drawer from "@material-ui/core/Drawer";
import {appTheme, createStyles, WithStyles} from "../..";

const styles = {
    drawerPaper: {
        height: '100%',
        width: appTheme.drawerWidth,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    drawerDocked: {
        height: '100%',
    },
};

export interface DrawerProps {
    persistent?: boolean,
    open?: boolean,
    onDrawerClose?: () => void,
}

class CDrawerWeb extends React.PureComponent<DrawerProps & WithStyles, {}>{
    render() {
        const {
            children,
            classes,
            open,
            onDrawerClose,
            persistent
        } = this.props;
        return (
            <Drawer
                variant={persistent ? "persistent" : "temporary"}
                classes={{
                    paper: classes.drawerPaper as any,
                    docked: classes.drawerDocked as any,
                }}
                open={open}
                onClose={onDrawerClose}
            >
                {children}
            </Drawer>
        );
    }
}

export const DrawerWeb: React.ComponentType<DrawerProps> = createStyles(styles, 'DrawerWeb')(CDrawerWeb);
