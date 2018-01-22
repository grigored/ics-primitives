import * as React from "react";
import {getStyleProps} from "../../utils/web";
import {createStyles} from "../createStyles/createStyles";
import {WithStyles} from "../..";
import { ImageProps } from './Image.types';

const styles = {
    image: {
        width: '100%',
        height: '100%',
    },
    icon: {
        width: 24,
        height: 24,
    },
};

class CImage extends React.PureComponent<ImageProps & WithStyles, {}> {
    render() {
        let {classes, children, style, source, onPress, openOnClick, resizeMode, color, s3Url} = this.props;

        let styles = style && style.constructor === Array ? [...style] : [style];
        let result;
        if (source.uri) {
            result = (
                <img
                    {...getStyleProps([...styles, classes.image, {objectFit: resizeMode}])}
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
export const Image = createStyles<ImageProps>(styles, componentName, CImage);
