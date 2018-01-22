import * as React from 'react';
import Drawer from "material-ui/Drawer";
import {appTheme, createStyles, WithStyles} from "../..";

const styles = {
    drawerPaper: {
        position: 'relative',
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

const CDrawerWeb: React.StatelessComponent<DrawerProps & WithStyles> = ({
    children,
    classes,
    open,
    onDrawerClose,
    persistent
}) => (
    <Drawer
        type={persistent ? "persistent" : "temporary"}
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

export const DrawerWeb = createStyles<DrawerProps>(styles, 'DrawerWeb', CDrawerWeb);
