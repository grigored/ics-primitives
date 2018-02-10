import * as React from "react";
import { Classes } from "../../utils/theme.types";

export interface ViewProps {
    accessible?: boolean;
    children?: React.ReactNode;
    collapsable?: boolean;
    dangerouslySetInnerHTML?: {__html: string};
    id?: string;
    /** for sketch */
    name?: string;
    onClick?: () => void;
    style?: Classes;
}