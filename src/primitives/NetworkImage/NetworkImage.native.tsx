import * as React from "react";
import { appTheme, createStyles, WithStyles } from "../..";
import { Image } from "../Image/Image.native";
import { View } from "../View/View";


let styles = () => ( {
    progress: {
        position: 'absolute',
        backgroundColor: '#f7f7f7',
        padding: 1,
        borderWidth: 1,
        borderColor: appTheme.primaryColor,
        tintColor: appTheme.primaryColor,
    },
    base: {
        width: 38,
        height: 38,
    },
} );

interface Props {
    style?: any,
    resizeMode?: "center" | "stretch" | "cover" | "contain" | "repeat",
    source?: any
    icon: any,
}

class CNetworkImage extends React.Component<Props & WithStyles, {}> {

    render() {
        let { classes, style, icon, ...imageProps } = this.props;

        return (
            <View style={[classes.base, style]}>

                <Image
                    style={[classes.base, classes.progress, style]}
                    source={icon}
                    resizeMode={'contain'}
                />
                <Image
                    source={this.props.source}
                    style={[classes.base, style]}
                    {...imageProps}
                />
            </View>
        );
    }
}

const componentName = 'NetworkImage';
export const NetworkImage = createStyles( styles, componentName )( CNetworkImage ) as React.ComponentType<Props>;
