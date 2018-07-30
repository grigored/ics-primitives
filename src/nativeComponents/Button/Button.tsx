import * as React from 'react';
import { getStyleProps } from "../../utils/web";
import { appTheme, createStyles, Image, WithStyles } from '../../';
import { ButtonProps } from './Button.types';

export { fade } from '@material-ui/core/styles/colorManipulator';

const styles = () => ( {
    container: {
        padding: '8px 16px',
        minWidth: 64,
        minHeight: 36,
        boxSizing: 'border-box',
        fontFamily: appTheme.fontFamily,
        fontWeight: '500',
        borderRadius: 4,
    },
} );

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

type Props = ButtonProps & WithStyles

class CButton extends React.PureComponent<Props, {}> {
    onClick( ev: any ) {
        let { onPress, href } = this.props;
        if (!!onPress) {
            onPress( ev )
        }
        if (!!href) {
            window.location.assign( href );
        }
    }


    render() {
        const {
            children,
            disabled,
            iconLeft,
            iconRight,
            primary,
            styles,
            title,
            backgroundColor,
            labelColor,
            classes,
        } = this.props;
        let buttonStyle = styles || {};
        buttonStyle.root = {
            ...( buttonStyle.root || {} ),
            ...getUpdatedRoot( primary, backgroundColor, labelColor ),
        };
        return (
            <button
                {...getStyleProps( [classes.container, buttonStyle.root] )}
                disabled={disabled}
                onClick={( ev: any ) => this.onClick( ev )}
            >
                {
                    iconLeft &&
                    <Image
                        style={[styles && styles.iconLeft]}
                        source={iconLeft}
                    />
                }
                {title || null}
                {
                    iconRight &&
                    <Image
                        style={[styles && styles.iconRight]}
                        source={iconRight}
                    />
                }
                {children}
            </button>
        );
    }
}

export const Button = createStyles( styles, 'Button' )( CButton ) as React.ComponentType<ButtonProps>;