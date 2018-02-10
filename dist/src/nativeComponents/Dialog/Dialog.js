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
import MaterialDialog from 'material-ui/Dialog';
import Fade from 'material-ui/transitions/Fade';
function Transition(props) {
    return React.createElement(Fade, __assign({}, props, { timeout: { enter: 400, exit: 500 } }));
}
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.hideDialog = _this.props.hideDialog.bind(_this);
        _this.onExited = _this.props.hideDialog.bind(_this);
        return _this;
    }
    Dialog.prototype.render = function () {
        var _a = this.props, body = _a.body, fullScreen = _a.fullScreen, visible = _a.visible, nonUrlProps = _a.nonUrlProps, urlProps = _a.urlProps;
        // noinspection JSUnusedLocalSymbols
        var BodyComponent = body;
        return (React.createElement(MaterialDialog, { open: visible, onExited: this.onExited, fullScreen: fullScreen, transition: Transition, onClose: this.hideDialog },
            React.createElement(BodyComponent, { displayTopbar: true, nonUrlProps: nonUrlProps, urlProps: urlProps, hideDialog: this.hideDialog })));
    };
    return Dialog;
}(React.PureComponent));
export { Dialog };
//# sourceMappingURL=Dialog.js.map