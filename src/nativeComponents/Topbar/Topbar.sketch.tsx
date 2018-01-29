import * as React from 'react';
import {TopbarProps} from "./Topbar.types";
import { Paper } from '../Paper/Paper';
import {appTheme, Text, View} from '../..';
import {createStyles, WithStyles} from "../..";
import { Button } from '../Button/Button';
import {TopbarListButtonData, TopbarSimpleButtonData} from "src/nativeComponents/Topbar/Topbar.types";

const styles = () => ({
    container: {
        backgroundColor: appTheme.primaryColor,
        width: '100%',
        height: appTheme.topBarHeight,
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: appTheme.primaryTextColor,
        fontSize: 24,
        fontWeight: 500,
    },
    buttonColor: {
        color: appTheme.primaryTextColor,
    }
});

const CTopbar: React.StatelessComponent<TopbarProps & WithStyles> = ({classes, title, rightButtonsData}) => (
    <Paper style={classes.container} name={'Topbar'}>
        <Text style={classes.text}>{title}</Text>
        <View>
            {rightButtonsData && rightButtonsData.map(buttonData => {
                if ((buttonData as TopbarListButtonData).items) {
                    let bd = buttonData as TopbarListButtonData;
                    return (
                        <Button
                            key={bd.title}
                            title={bd.title}
                            // items={buttonData.items}
                        />
                    );
                } else {
                    let bd = buttonData as TopbarSimpleButtonData;
                    return (
                        <Button
                            key={bd.title}
                            onPress={bd.onPress}
                            title={bd.title}
                            href={bd.href}
                            styles={{
                                label: classes.buttonColor,
                            }}
                        />
                    );
                }
            })}
        </View>
    </Paper>
);

export const Topbar = createStyles(styles, 'Topbar', CTopbar);