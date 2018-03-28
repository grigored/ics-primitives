/**
 * Created by alexbuicescu on 19 - Mar 2018.
 */

import * as React from 'react';
import { appTheme, Classes, WithStyles } from '../';
import { CIRCULAR_PROGRESS_SIZE } from '../utils/enums';
import { CircularProgressComponent } from './CircularProgressComponent/CircularProgressComponent';
import { createStyles } from '../decorators/createStyles/createStyles';
import { View } from './View/View';

const styles = () => ({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 11,
        opacity: 0.7,
        position: 'absolute',
        backgroundColor: appTheme.loadingContainerBackground,
    }
});

export interface Props {
    size?: CIRCULAR_PROGRESS_SIZE,
    style?: Classes,
}

class CLoadingContainer extends React.PureComponent<Props & WithStyles, {}> {
    render() {
        let {classes, size, style} = this.props;
        return (
            <View style={[classes.container, style]}>
                <CircularProgressComponent
                    size={size}
                />
            </View>
        )
    }
}

const componentName = 'LoadingContainer';
export const LoadingContainer: React.ComponentType<Props> = createStyles(styles, componentName)(CLoadingContainer);
