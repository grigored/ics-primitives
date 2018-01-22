export interface ImageProps {
    key?: string | number;
    children?: any;
    style?: any;
    id?: string;
    onPress?: () => void;
    color?: string;
    s3Url?: string;
    openOnClick?: boolean,
    resizeMode: any, // sketch expects import {ResizeMode} from "react-sketchapp";
    source: {uri: string} | any; // TODO add material ui image here
}