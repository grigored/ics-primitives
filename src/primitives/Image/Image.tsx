import * as React from "react";
import {getStyleProps} from "../../utils/web";
import {createStyles} from "../createStyles/createStyles";
import {WithStyles} from "../..";

const styles = {
    image: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
    },
    icon: {
        width: 24,
        height: 24,
    },
};


export interface Props {
    key?: string | number;
    children?: any;
    style?: any;
    id?: string;
    onPress?: () => void;
    color?: string;
    s3Url?: string;
    openOnClick?: boolean,
    resizeMode?: string,
    source?: {uri: string} | any; // TODO add material ui image here
}

class CImage extends React.PureComponent<Props & WithStyles, {}> {
    render() {
        let {classes, children, style, source, onPress, openOnClick, color, s3Url} = this.props;

        let styles = style && style.constructor === Array ? [...style] : [style];
        let result;
        if (source.uri) {
            result = (
                <img
                    {...getStyleProps([...styles, classes.image])}
                    src={source.uri}
                    onClick={onPress}
                >
                    {children}
                </img>
            );
        } else {
            styles.unshift(classes.icon);
            // noinspection JSUnusedLocalSymbols
            let ImageComponent = source;
            result = (
                <ImageComponent
                    {...getStyleProps(styles)}
                    color={color}
                    onClick={onPress}
                >
                    {children}
                </ImageComponent>
            );
        }

        if (!openOnClick || !source.uri) {
            return result;
        }

        return (
            <a style={{flex: 1}} href={s3Url} target="_blank">
                {result}
            </a>
        );

    }
}

const componentName = 'Image';
export const Image = createStyles<Props>(styles, componentName, CImage);
