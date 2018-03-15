import * as React from 'react';
import { fade } from 'material-ui/styles/colorManipulator';
import MaterialButton from 'material-ui/Button';
import { Image } from '../../';
import { ButtonProps } from './Button.types';

export { fade } from 'material-ui/styles/colorManipulator';

const getUpdatedRoot = (backgroundColor?: string, labelColor?: string): any => {
    let root: any = {};
    if (backgroundColor) {
        root = {
            backgroundColor,
            // TODO this doesn't work when set in inline style, it must be used with classnames;
            // also we cannot use inline styles to set backgroundColor and then use classnames to set hover color
            // https://stackoverflow.com/a/48829870/1651296
            // I think we should use JSS to generate classnames from the auto generated inline style
            '&:hover': {
                backgroundColor: `${fade('#f00', 0.12)} !important`,
            }
        }
    }
    if (labelColor) {
        root.color = labelColor
    }
    return root;
};

export class Button extends React.PureComponent<ButtonProps, {}> {
    render() {
        const {
            children, disabled, iconLeft, iconRight, onPress, href, primary, raised, styles, classes, title,
            backgroundColor, labelColor,
        } = this.props;
        let buttonStyle = styles || {};
        // let buttonStyle = {};
        buttonStyle.root = {
            ...(buttonStyle.root || {}),
            ...getUpdatedRoot(backgroundColor, labelColor),
        };
        return (
            <MaterialButton
                classes={classes}
                style={buttonStyle.root}
                color={primary ? 'primary' : undefined}
                disabled={disabled}
                href={href}
                onClick={onPress}
                raised={raised}
            >
                {
                    iconLeft &&
                    <Image
                        style={[styles && styles.iconLeft]}
                        source={iconLeft}
                    />
                }
                {!!title ? title : null}
                {
                    iconRight &&
                    <Image
                        style={[styles && styles.iconRight]}
                        source={iconRight}
                    />
                }
                {children}
            </MaterialButton>
        );
    }
}
