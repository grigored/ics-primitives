export interface ImageProps {
    key?: string | number;
    children?: any;
    style?: any;
    id?: string;
    onPress?: () => void;
    color?: string;
    s3Url?: string;
    openOnClick?: boolean;
    resizeMode: any;
    source: {
        uri: string;
    } | any;
}
