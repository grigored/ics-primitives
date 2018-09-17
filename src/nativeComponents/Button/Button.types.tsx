// import {StyleSheetClass} from "../../utils/theme.types";

export interface ButtonProps {
    disabled?: boolean,
    iconLeft?: any,
    iconRight?: any,
    href?: string,
    onPress?: ( event?: any ) => void,
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
    actionVariant?: boolean,
    // className?: any,
    title?: string,
}