import { ViewProps } from '../View/View.types';

export interface TouchableProps extends ViewProps{
    disabled?: boolean,
    activeOpacity?: number,
    onPress?: () => void,
    underlayColor?: string,
    useForeground?: boolean
}
