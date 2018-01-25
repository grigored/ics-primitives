import * as React from "react";
import MaterialButton from "material-ui/Button";
import {ButtonProps} from "./Button.types";

export const Button: React.StatelessComponent<ButtonProps> = ({
    children,
    disabled,
    icon,
    onPress,
    href,
    primary,
    raised,
    styles,
    title,
}) => {
    return (
        <MaterialButton
            classes={styles as any}
            color={primary ? "primary": undefined}
            disabled={disabled}
            href={href}
            onClick={onPress}
            raised={raised}
        >
            {!!title ? title: null}
            {children}
        </MaterialButton>
    );
};
