import { StyleSheetClass } from '../../utils/theme.types';

export interface Props {
    navigation: any,  // used on native
    disableClick: boolean,
    dropzoneStyle: StyleSheetClass,
    onDrop: (files: Array<any> | any) => void,  // File on web, Image on native
    photoPreview: string,
    s3Url: string,
    accept: string,
    multiple: boolean,
    uploading: boolean,  // used on native
    uploadSuccess: boolean,  // used on native
    removePhoto: () => void,
}
