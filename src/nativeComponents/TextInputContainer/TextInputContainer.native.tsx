import * as React from 'react';
import { all, android, appTheme, Button, createStyles, Text, View, WithStyles } from '../../';


let styles = () => ({
    containerLeft: {
        flexDirection: 'row',
        height: appTheme.inputHeight,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftLabel: {
        minWidth: 150,
        fontWeight: '500',
    },
    topLabel: {
        marginBottom: -10,
        color: {
            [android]: appTheme.primaryColor,
            [all]: appTheme.disabledTextColor,
        },
        // paddingLeft: {
        //     [android]: 4,
        // },
    },
    error: {
        marginTop: -5,
        zIndex: 0,
        color: appTheme.errorColor
    },
    topValue: {
        borderBottomColor: {
            [android]: appTheme.primaryColor,
            [all]: appTheme.dividerColor,
        },
        borderBottomWidth: {
            [android]: 1,
            [all]: appTheme.dividerSize
        },
        color: '#000',
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 12,
    },
    leftValue: {
        fontWeight: '500',
        fontSize: 15,
        flex: 1,
    }

});

export interface Props {
    error?: string,
    labelPositionLeft: boolean,
    onPress: () => void,
    title?: string,
    value: string,
}


const CTextInputContainer = ( {
                                  classes,
                                  error,
                                  labelPositionLeft,
                                  onPress,
                                  title,
                                  value,
                              }: Props & WithStyles ) => (
    <Button
        onPress={onPress}
    >
        <View>
            <View style={labelPositionLeft ? classes.containerLeft : classes.containerTop}>
                <Text style={labelPositionLeft ? classes.leftLabel : classes.topLabel}>{title}</Text>
                <Text style={labelPositionLeft ? classes.leftValue : classes.topValue}>{value}</Text>
            </View>
            {!!error && <Text style={classes.error}>{error}</Text>}
        </View>
    </Button>
);

const componentName = 'TextInputContainer';
export const TextInputContainer: React.ComponentType<Props> = createStyles(styles, componentName)(CTextInputContainer);
