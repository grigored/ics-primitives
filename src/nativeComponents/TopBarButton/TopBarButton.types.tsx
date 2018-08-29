import { Testable } from "../../";

export type TopBarButtonProps = {
    onPress: (args?: any) => void,
    imgSrc?: any,
    text?: string,
    goBack?: () => void,
    testProps?: any,
    navigation: any,
    imgStyle?: any,
} & Testable
