import { ViewProps } from '../View/View.types';

export interface TouchableProps extends ViewProps{
    disabled?: boolean,
    activeOpacity?: number,
    onPress?: (event?: any) => void,
    underlayColor?: string,
    useForeground?: boolean
}
