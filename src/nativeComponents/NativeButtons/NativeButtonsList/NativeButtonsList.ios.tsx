import * as React from 'react';
import { createStyles, View } from "../../..";
import { NativeButton } from "../NativeButton";
import { NativeButtonOwnProps } from "../NativeButton.types";
import { NativeButtonsListOwnProps, NativeButtonsListProps } from "./NativeButtonsList.types";

const styles = () => ( {
    container: {
        flex: 0,
        width: '100%',
    }
} );

class CNativeButtonsList extends React.PureComponent<NativeButtonsListProps, {}> {
    render() {
        let { buttons, classes } = this.props;
        return (
            <View style={classes.container}>
                {buttons.map( ( buttonData: NativeButtonOwnProps, index: number ) => (
                    <NativeButton
                        {...buttonData}
                    />
                ) )}
            </View>
        );
    }
}

export const NativeButtonsList = createStyles(
    styles,
    'NativeButtonsList',
)( CNativeButtonsList ) as React.ComponentType<NativeButtonsListOwnProps>;