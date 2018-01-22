import * as React from 'react';
import {TopbarProps} from "./Topbar.types";
import {appTheme, Text, View} from '../..';
import {createStyles, WithStyles} from "../..";
import {defaultClasses} from "../../utils/theme";

const styles = () => ({
    container: {
        backgroundColor: appTheme.primaryColor,
        width: '100%',
        height: appTheme.topBarHeight,
        ...defaultClasses.paper,
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
    <View style={classes.container}>
        <Text style={classes.text}>{title}</Text>
    </View>
);

export const Topbar = createStyles(styles, 'Topbar', CTopbar);