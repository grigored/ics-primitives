import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import MaterialButton from '@material-ui/core/Button';
import { appTheme, Image } from '../../';
import { ButtonProps } from './Button.types';

export { fade } from '@material-ui/core/styles/colorManipulator';

const getUpdatedRoot = ( primary?: boolean, backgroundColor?: string, labelColor?: string ): any => {
    let root: any = {};
    if (backgroundColor) {
        // root = {
        //     backgroundColor,
        //     // TODO this doesn't work when set in inline style, it must be used with classnames;
        //     // also we cannot use inline styles to set backgroundColor and then use classnames to set hover color
        //     // https://stackoverflow.com/a/48829870/1651296
        //     // I think we should use JSS to generate classnames from the auto generated inline style
        //     '&:hover': {
        //         backgroundColor: `${fade('#f00', 0.12)} !important`,
        //     }
        // }
    }
    root.backgroundColor = backgroundColor;
    root.color = labelColor;
    if (primary) {
        root.backgroundColor = backgroundColor || appTheme.primaryColor;
        root.color = labelColor || appTheme.primaryTextColor;
    }
    root.textTransform = 'none';
    return root;
};

class CButton extends React.PureComponent<ButtonProps & InjectedTranslateProps, {}> {
    render() {
        const {
            children, disabled, iconLeft, iconRight, onPress, href, primary, raised, styles, className, title,
            backgroundColor, labelColor, t,
        } = this.props;
        let buttonStyle = styles || {};
        // let buttonStyle = {};
        buttonStyle.root = {
            ...( buttonStyle.root || {} ),
            ...getUpdatedRoot( primary, backgroundColor, labelColor ),
        };
        return (
            <MaterialButton
                classes={className}
                style={buttonStyle.root}
                color={primary ? 'primary' : undefined}
                disabled={disabled}
                href={href}
                onClick={onPress}
                variant={raised ? 'raised' : 'flat'}
            >
                {
                    iconLeft &&
                    <Image
                        style={[styles && styles.iconLeft]}
                        source={iconLeft}
                    />
                }
                {!!title ? t( title ) : null}
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

export const Button: React.ComponentType<ButtonProps> = translate()( CButton );