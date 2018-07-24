import * as React from 'react';
import { appTheme, createStyles, Text, Touchable, View, WithStyles } from '../../';


let styles = () => ( {
    touchable: {
        flex: 1,
    },
    containerLeft: {
        flexDirection: 'row',
        height: appTheme.inputHeight,
        justifyContent: 'space-between',
        flex: 1,
        flexShrink: 0,
        alignItems: 'center',
    },
    containerTop: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    leftLabel: {
        fontWeight: '500',
        flexGrow: 1,
        flexShrink: 0,
    },
    topLabel: {
        marginBottom: -10,
        color: appTheme.primaryColor,
    },
    error: {
        marginTop: -5,
        zIndex: 0,
        color: appTheme.errorColor
    },
    topValue: {
        borderBottomColor: appTheme.primaryColor,
        borderBottomWidth: 1,
        color: '#000',
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 12,
    },
    leftValue: {
        fontWeight: '500',
        fontSize: 15,
        flexGrow: 1,
        flexShrink: 0,
    }
} );

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
    <Touchable
        onPress={onPress}
        style={classes.touchable}
    >
        <View style={labelPositionLeft ? classes.containerLeft : classes.containerTop}>
            <Text style={labelPositionLeft ? classes.leftLabel : classes.topLabel}>{title}</Text>
            <Text style={labelPositionLeft ? classes.leftValue : classes.topValue}>{value}</Text>
        </View>
        {!!error && <Text style={classes.error}>{error}</Text>}
    </Touchable>
);

const componentName = 'TextInputContainer';
export const TextInputContainer: React.ComponentType<Props> = createStyles( styles, componentName )( CTextInputContainer );
