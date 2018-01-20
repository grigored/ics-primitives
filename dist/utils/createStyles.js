export function createStyles(styles, componentName, WrappedComponent, name) {
    return withStyles(function () {
        return combineStyles(styles, componentName, appTheme);
    })(WrappedComponent);
}
//# sourceMappingURL=createStyles.js.map