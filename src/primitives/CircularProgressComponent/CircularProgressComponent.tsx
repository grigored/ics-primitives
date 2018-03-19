/**
 * Created by alexbuicescu on 19 - Mar 2018.
 */

import { CircularProgress } from 'material-ui/Progress';
import * as React from 'react';
import { appTheme } from '../..//utils/theme';
import { createStyles, WithStyles } from '../../';
import { CIRCULAR_PROGRESS_SIZE } from '../../utils/enums';
import { Props } from './CircularProgressComponent.types';

const styles = () => ({
    progress: {
        color: appTheme.primaryColor,
    }
});

class CCircularProgressComponent extends React.PureComponent<Props & WithStyles, {}> {

    render() {
        let {style, size, thickness} = this.props;
        let progressSize = 0;
        switch (size) {
            case CIRCULAR_PROGRESS_SIZE.LARGE:
                progressSize = 100;
                thickness = thickness || 7;
                break;
            case CIRCULAR_PROGRESS_SIZE.SMALL:
            default:
                progressSize = 40;
                thickness = thickness || 3;
                break;
        }

        return (
            <CircularProgress
                style={{color: appTheme.primaryColor, ...(style || {})}}
                size={progressSize}
                thickness={thickness}
            />
        );
    }
}

const componentName = 'CircularProgressComponent';
export const CircularProgressComponent = createStyles<Props>(styles, componentName, CCircularProgressComponent);
