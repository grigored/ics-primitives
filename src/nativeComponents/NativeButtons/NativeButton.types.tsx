import { Testable, WithStyles } from "../..";


export type NativeButtonOwnProps = {
    title: string,
    onPress: () => void,
    icon?: any,
    extraItemLeft?: any,
    extraItemRight?: any,
} & Testable

export type NativeButtonProps = NativeButtonOwnProps & WithStyles