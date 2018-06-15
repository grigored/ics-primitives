import { WithStyles } from "../..";


export interface NativeButtonOwnProps {
    title: string,
    onPress: () => void,
    icon?: any,
    extraItemLeft?: any,
    extraItemRight?: any,
}

export type NativeButtonProps = NativeButtonOwnProps & WithStyles