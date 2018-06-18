import { WithStyles } from "../../..";
import { NativeButtonOwnProps } from "../NativeButton.types";

export interface NativeButtonsListOwnProps {
    buttons: Array<NativeButtonOwnProps>,
}

export type NativeButtonsListProps = NativeButtonsListOwnProps & WithStyles