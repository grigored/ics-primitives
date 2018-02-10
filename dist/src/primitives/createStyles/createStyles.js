import { withStyles } from 'material-ui/styles';
import { combineStyles } from "../../utils/combineStyles";
export var createStyles = function (styles, componentName, WrappedComponent, name) {
    return withStyles(function () { return combineStyles(styles, componentName); })(WrappedComponent);
};
//# sourceMappingURL=createStyles.js.map