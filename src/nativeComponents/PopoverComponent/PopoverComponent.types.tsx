import { StyleRules } from "src/utils/theme.types";

export interface OwnProps {
    children: JSX.Element,
    containerStyle?: StyleRules,
    actions: Array<{
        title: string,
        onClick: () => void,
    }>
    connectedShowActionSheet: Function,
}