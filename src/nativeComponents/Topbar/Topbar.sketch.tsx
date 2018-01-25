import * as React from 'react';
import {TopbarProps} from "./Topbar.types";
import { Paper } from '../Paper/Paper';
import {appTheme, Text, View} from '../..';
import {createStyles, WithStyles} from "../..";
import { Button } from '../Button/Button';

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
            {rightButtonsData && rightButtonsData.map(buttonData =>
                !!buttonData.items
                    ? <Button
                        key={buttonData.title}
                        icon={buttonData.icon}
                        title={buttonData.title}
                        onPress={() => {}}
                        // items={buttonData.items}
                    />
                    : <Button
                        key={buttonData.title}
                        onPress={buttonData.onClick}
                        title={buttonData.title}
                        href={buttonData.href}
                        styles={{
                            label: classes.buttonColor,
                        }}
                    />
            )}
        </View>
    </Paper>
);

export const Topbar = createStyles(styles, 'Topbar', CTopbar);