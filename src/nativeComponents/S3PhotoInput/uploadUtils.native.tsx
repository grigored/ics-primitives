import { InjectedTranslateProps } from "react-i18next";
import { Image } from "react-native-image-crop-picker";
import { getImageUrl } from "src/nativeComponents/S3PhotoInput/common";
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { checkImageRestrictions, getImagePreview, getPhotoDetails } from "./common";
import { ConnectedProps, S3PhotoComponentDBValue, S3PhotoInputComponentProps } from './S3PhotoInputComponent.types';

export function onDrop( acceptedFiles: Array<Image>,
                        rejectedFiles: Array<Image>,
                        props: S3PhotoInputComponentProps &
                            ConnectedProps &
                            FieldStateProps<S3PhotoComponentDBValue> &
                            InjectedTranslateProps, ) {
    let {
        field, postPhotoToS3, showAlert, t,
        minWidth, maxWidth, minHeight, maxHeight, fixedWidth, fixedHeight, ratioWidthHeight,
    } = props;
    let error = null;
    let file = acceptedFiles[0];
    // if (!file.mime.match( 'image/*' )) {  // todo file.mime is undefined
    //     error = 'FILE_IS_NOT_IMAGE';
    // } else {
        if (checkImageRestrictions(
                showAlert,
                t,
                file.width,
                file.height,
                minWidth,
                maxWidth,
                minHeight,
                maxHeight,
                fixedWidth,
                fixedHeight,
                ratioWidthHeight,
            )) {
            let fieldData = {
                field,
                url: 'get_s3_upload_params',
                s3ExtraData: getPhotoDetails( { rawValue: { ...file, type: 'image/jpeg' } } ),
                preview: getImageUrl( getImagePreview( { rawValue: file } ) )
            };
            postPhotoToS3( fieldData );
        }
        else {
            error = 'FILE_IS_INVALID';
        }
    // }
    if (error) {
        showAlert( error );
    }
}