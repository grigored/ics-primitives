import * as React from 'react';
import { View } from '../View/View';
import { TouchableProps } from "./Touchable.types";


export const Touchable: React.StatelessComponent<TouchableProps> = ({onPress, ...otherProps}) => (
    <View onClick={onPress} {...otherProps}/>
);
