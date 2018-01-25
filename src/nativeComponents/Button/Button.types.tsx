import {StyleSheetClass} from "../../utils/theme.types";

export interface ButtonProps {
    disabled?: boolean,
    icon?: string,
    href?: string,
    onPress?: () => void,
    primary?: boolean,
    raised?: boolean,
    styles?: {
        icon?: StyleSheetClass,
        label?: StyleSheetClass,
        root?: StyleSheetClass,
    },
    title?: string,
}