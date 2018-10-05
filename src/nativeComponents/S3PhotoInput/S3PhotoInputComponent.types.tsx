import { pushScreen, showAlert } from '../../redux/reducers/navigation';
import { postPhotoToS3, removePhoto } from '../../redux/reducers/s3upload';

export interface S3PhotoInputComponentProps {
    containerStyle?: Array<any>,
    componentStyle?: any,
    defaultValue?: string,
    style?: any,
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
    additionalOnDrop?: ( acceptedFiles: Array<File>, rejectedFiles: Array<File> ) => void,
    lastPhotoIndex?: number,
    addPhotoIcon: any,
    removePhotoIcon: any,
}

export interface ConnectedProps {
    uploadingPhotoToS3: boolean,
    uploadingPhotoToS3Success: boolean,
    photoPreview: string,
    s3Url: string,

    postPhotoToS3: typeof postPhotoToS3,
    pushScreen: typeof pushScreen,
    removePhoto: typeof removePhoto,
    showAlert: typeof showAlert,
}

export type S3PhotoComponentDBValue = string;