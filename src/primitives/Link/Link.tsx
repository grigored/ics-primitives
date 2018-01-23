import * as React from 'react';
import { LinkProps } from './Link.types';

export const Link: React.StatelessComponent<LinkProps> = ({children, style, href}) => (
    <a href={href} className={style as string}>
        {children}
    </a>
);