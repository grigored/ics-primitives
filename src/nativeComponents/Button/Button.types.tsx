// import {StyleSheetClass} from "../../utils/theme.types";

export interface ButtonProps {
    disabled?: boolean,
    iconLeft?: string,
    iconRight?: string,
    href?: string,
    onPress?: () => void,
    primary?: boolean,
    raised?: boolean,
    backgroundColor?: string,
    labelColor?: string,
    // styles?: {
    //     iconLeft?: StyleSheetClass,
    //     iconRight?: StyleSheetClass,
    //     label?: StyleSheetClass,
    //     root?: StyleSheetClass,
    //     raised?: StyleSheetClass,
    // },
    styles?: any,
    classes?: any,
    title?: string,
}