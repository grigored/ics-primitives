/**
 * Created by alexbuicescu on 19 - Mar 2018.
 */

import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { appTheme } from '../..//utils/theme';
import { Props } from './CircularProgressComponent.types';


export class CircularProgressComponent extends React.PureComponent<Props, {}> {

    render() {
        let {style} = this.props;

        return (
            <ActivityIndicator
                style={style as any}
                size={'large'}
                color={appTheme.primaryColor}
            />
        );
    }
}