/// <reference types="react" />
import { BUTTON_TYPE } from '../enums';
export interface ButtonProps {
    backgroundColor?: string;
    children?: any;
    disabled?: boolean;
    fullWidth?: boolean;
    key?: string | number;
    icon?: Object;
    iconStyle?: any;
    id?: string;
    labelColor?: string;
    labelStyle?: any;
    onPress?: (event?: any) => void;
    style?: any;
    testProps?: any;
    title?: string | JSX.Element;
    touchableStyle?: any;
    type?: BUTTON_TYPE;
}
