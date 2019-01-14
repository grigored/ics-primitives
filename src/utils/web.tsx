import {AppTheme, Classes} from "./theme.types";

export const getStyleProps = (style?: Classes) => {
    const generalStyle = {
        display: 'flex',
    };


    if (!style) {
        return {style: generalStyle};
    }
    else if (Array.isArray(style)) {
        let classes = style.filter(item => typeof(item) === 'string'),
            styleItems = style.filter(item => typeof(item) === 'object' && !Array.isArray(item)),
            styles = {...generalStyle};
        for (let tStyle of style) {
            if (Array.isArray(tStyle)) {
                const flattenedStyles = getStyleProps(tStyle);
                if (flattenedStyles.style) {
                    styleItems.push(flattenedStyles.style);
                }
                if (flattenedStyles.className) {
                    classes.push(flattenedStyles.className)
                }
            }
        }

        styleItems.forEach(item => {
            styles = Object.assign(styles, item);
        });

        return {
            style: styles,
            className: classes.join(' ')
        }
    } else if (typeof(style) === 'object') {
        // so style is an inline style
        return {
            style: {...generalStyle, ...style}
        }
    }
    else if (typeof(style) === 'string') {
        return {
            style: generalStyle,
            className: style
        }
    }
    else {
        throw 'Unknown style type';
    }
};

export const getMuiTheme = (appTheme: AppTheme) => {
    let hues = [
            "50",
            "100",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "A100",
            "A200",
            "A400",
            "A700",
            "contrastDefaultColor",
        ], primary: any = {},
        secondary: any = {};
    hues.forEach(hue => {
        primary[hue] = appTheme.primaryColor;
        secondary[hue] = appTheme.secondaryColor;
    });
    return {
        typography:{
            // fontFamily: appTheme.fontFamily,
        },
        palette: {
            primary,
            secondary,
        }
    };
};
