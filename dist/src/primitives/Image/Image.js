var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from "react";
import { getStyleProps } from "../../utils/web";
import { createStyles } from "../createStyles/createStyles";
var styles = {
    image: {
        width: '100%',
        height: '100%',
    },
    icon: {
        width: 24,
        height: 24,
    },
};
var CImage = /** @class */ (function (_super) {
    __extends(CImage, _super);
    function CImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CImage.prototype.render = function () {
        var _a = this.props, classes = _a.classes, children = _a.children, style = _a.style, source = _a.source, onPress = _a.onPress, openOnClick = _a.openOnClick, resizeMode = _a.resizeMode, color = _a.color, s3Url = _a.s3Url;
        var styles = style && style.constructor === Array ? style.slice() : [style];
        var result;
        if (source.uri) {
            result = (React.createElement("img", __assign({}, getStyleProps(styles.concat([classes.image, { objectFit: resizeMode }])), { src: source.uri, onClick: onPress }), children));
        }
        else {
            styles.unshift(classes.icon);
            // noinspection JSUnusedLocalSymbols
            var ImageComponent = source;
            result = (React.createElement(ImageComponent, __assign({}, getStyleProps(styles), { color: color, onClick: onPress }), children));
        }
        if (!openOnClick || !source.uri) {
            return result;
        }
        return (React.createElement("a", { style: { flex: 1 }, href: s3Url, target: "_blank" }, result));
    };
    return CImage;
}(React.PureComponent));
var componentName = 'Image';
export var Image = createStyles(styles, componentName, CImage);
//# sourceMappingURL=Image.js.map