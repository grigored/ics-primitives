import * as React from 'react';
import {TopbarProps} from "./Topbar.types";
import { Paper } from '../Paper/Paper';
import {appTheme, Text} from '../..';
import {createStyles, WithStyles} from "../..";

const styles = () => ({
    container: {
        backgroundColor: appTheme.primaryColor,
        width: '100%',
        height: appTheme.topBarHeight,
        paddingLeft: 24,
        paddingRight: 24
    },
    text: {
        color: appTheme.primaryTextColor,
        fontSize: 24,
        fontWeight: 500,
    }
});

const CTopbar: React.StatelessComponent<TopbarProps & WithStyles> = ({classes, title}) => (
    <Paper style={classes.container} name={'Topbar'}>
        <Text style={classes.text}>{title}</Text>
    </Paper>
);

export const Topbar = createStyles(styles, 'Topbar', CTopbar);