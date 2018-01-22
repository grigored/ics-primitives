/// <reference types="react" />
import * as React from "react";
export interface Props {
    key?: string | number;
    children?: any;
    style?: any;
    id?: string;
    onPress?: () => void;
    color?: string;
    s3Url?: string;
    openOnClick?: boolean;
    resizeMode?: string;
    source?: {
        uri: string;
    } | any;
}
export declare const Image: React.ComponentType<Props>;
