import * as React from 'react';
import { appTheme, createStyles, Image, Text, Touchable, View } from "../../";
import { NativeButtonOwnProps, NativeButtonProps } from "./NativeButton.types";

const styles = () => ( {
    container: {
        height: 43,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    inner: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        padding: appTheme.marginM,
    },
} );

class CNativeButton extends React.PureComponent<NativeButtonProps, {}> {
    render() {
        let { classes, title, onPress, icon, extraItemLeft, extraItemRight } = this.props;
        return (
            <Touchable
                onPress={() => onPress()}
                style={classes.container}
            >
                <View style={classes.inner}>
                    <Text>{title}</Text>
                    {extraItemLeft || null}
                    <View style={{ flex: 1 }}/>
                    {extraItemRight || null}
                    {!!icon && <Image source={icon}/>}
                </View>
                <View style={{ height: 1, width: '100%', backgroundColor: '#e2e2e2' }}/>
            </Touchable>
        )
    }
}

export const NativeButton = createStyles(
    styles,
    'NativeButton',
)( CNativeButton ) as React.ComponentType<NativeButtonOwnProps>;