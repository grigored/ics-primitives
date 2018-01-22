var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
export function getStyleProps(style) {
    var generalStyle = {
        display: 'flex',
        fontFamily: 'Roboto',
    };
    if (!style) {
        return { style: generalStyle };
    }
    else if (Array.isArray(style)) {
        var classes = style.filter(function (item) { return typeof (item) === 'string'; }), styleItems = style.filter(function (item) { return typeof (item) === 'object'; }), styles_1 = __assign({}, generalStyle);
        styleItems.forEach(function (item) {
            styles_1 = Object.assign(styles_1, item);
        });
        return {
            style: styles_1,
            className: classes.join(' ')
        };
    }
    else if (typeof (style) === 'object') {
        // so style is an inline style
        return {
            style: __assign({}, generalStyle, style)
        };
    }
    else if (typeof (style) === 'string') {
        return {
            style: generalStyle,
            className: style
        };
    }
    else {
        throw 'Unknown style type';
    }
}
export function getMuiTheme(appTheme) {
    var hues = [
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
    ], primary = {}, secondary = {};
    hues.forEach(function (hue) {
        primary[hue] = appTheme.primaryColor;
        secondary[hue] = appTheme.secondaryColor;
    });
    return {
        palette: {
            primary: primary,
            secondary: secondary,
        }
    };
}
//# sourceMappingURL=web.js.map