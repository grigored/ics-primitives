import * as React from "react";
import MaterialButton from "material-ui/Button";
import {ButtonProps} from "./Button.types";

export const Button: React.StatelessComponent<ButtonProps> = ({
    children,
    disabled,
    icon,
    onPress,
    primary,
    raised,
    styles,
    title,
}) => {
    return (
        <MaterialButton
            raised={raised}
            onClick={onPress}
            disabled={disabled}
            classes={styles as any}
            color={primary ? "primary": undefined}
        >
            {!!title ? title: null}
            {children}
        </MaterialButton>
    );
};
