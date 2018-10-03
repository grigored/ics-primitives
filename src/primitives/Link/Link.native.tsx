import * as React from 'react';
import { LinkProps } from './Link.types';
import {Linking, TouchableOpacity, Text} from "react-native";

export const Link: React.StatelessComponent<LinkProps> = ({children, style, href}) => (
    <TouchableOpacity onPress={() => Linking.openURL(href)}>
        <Text style={{color: 'blue'}}>
            {children}
        </Text>
    </TouchableOpacity>
);