import * as React from 'react';
import { WithStyles } from '../../utils/theme.types';

export type returnType = <T extends {}>
( component: (React.ComponentClass<T & WithStyles> | React.ComponentType<T & WithStyles>) ) => React.ComponentClass<T & WithStyles> | React.ComponentType<T & WithStyles>
