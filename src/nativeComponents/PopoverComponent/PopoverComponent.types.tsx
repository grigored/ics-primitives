import { StyleRules } from "../../utils/theme.types";
import { Action } from '../TableComponent/TableComponent.types';

export interface OwnProps {
    children: JSX.Element,
    containerStyle?: StyleRules,
    actions: Array<Action>
}