import { StyleRules } from "../../utils/theme.types";

export interface OwnProps {
    children: JSX.Element,
    containerStyle?: StyleRules,
    actions: Array<{
        title: string,
        onClick: () => void,
    }>
    connectedShowActionSheet: Function,
}