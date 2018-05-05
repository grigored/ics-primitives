import { pushScreen, showAlert } from '../../redux/reducers/navigation';
import { postPhotoToS3, removePhoto } from '../../redux/reducers/s3upload';
import { StyleRules } from '../../utils/theme.types';


export interface ConnectedProps {
    uploadingPhotoToS3: boolean,
    uploadingPhotoToS3Success: boolean,
    photoPreview: string,
    s3Url: string,
    showAlert: typeof showAlert,
    postPhotoToS3: typeof postPhotoToS3,
    pushScreen: typeof pushScreen,
    removePhoto: typeof removePhoto,
}
export type S3PhotoComponentDBValue = string;

export interface S3PhotoInputComponentProps {
    containerStyle?: Array<StyleRules | string>,
    componentStyle?: StyleRules,
    defaultValue?: string,
    style?: StyleRules,
    field: string,
    minWidth?: number,
    maxWidth?: number,
    minHeight?: number,
    maxHeight?: number,
    fixedWidth?: number,
    fixedHeight?: number,
    ratioWidthHeight?: number,
    title: string,
    multiple?: boolean,
    displaySelectedPreview?: boolean,
    additionalOnDrop?: ( files: Array<File> ) => void,
    lastPhotoIndex?: number,
}
