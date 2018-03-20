/**
 * Created by alexbuicescu on 19 - Mar 2018.
 */

import { CIRCULAR_PROGRESS_SIZE } from '../../utils/enums';
import { Classes } from '../../utils/theme.types';

export interface Props {
    size?: CIRCULAR_PROGRESS_SIZE,
    style?: Classes,
    thickness?: number,
}
