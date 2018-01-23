import * as React from 'react';
import { LinkProps } from './Link.types';
import { Text } from '../Text/Text';

export const Link: React.StatelessComponent<LinkProps> = ({children, style}) => (
    <Text style={style}>
        {children}
    </Text>
);