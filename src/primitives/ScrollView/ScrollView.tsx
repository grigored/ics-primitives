import * as React from 'react';
import { Classes } from '../../utils/theme.types';
import { View } from '../View/View';

export interface Props {
    horizontal?: boolean
    style?: Classes
    children?: React.ReactNode
    contentContainerStyle?: Classes
    directionalLockEnabled?: boolean
}

export class ScrollView extends React.PureComponent<Props, {}> {
    render() {
        return (
            <View {...this.props}/>
        );
    }
}