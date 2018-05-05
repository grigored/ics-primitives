/**
 * Created by alexbuicescu on 18 - Aug 2017.
 */

import { Image } from "react-native-image-crop-picker";
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { ConnectedProps, S3PhotoInputComponentProps } from './S3PhotoInputComponent.types';
import { checkImageRestrictions } from "./common";
import { S3PhotoComponentDBValue } from './S3PhotoInputComponent.types';

export function onDrop( files: Array<Image>, props: S3PhotoInputComponentProps & ConnectedProps & FieldStateProps<S3PhotoComponentDBValue> ) {
    let {
        field, postPhotoToS3, showAlert,
        minWidth, maxWidth, minHeight, maxHeight, fixedWidth, fixedHeight, ratioWidthHeight,
    } = props;
    let error = null;
    // for (let i in files) {
    let file = files[0];
    if (!file.mime.match( 'image/*' )) {
        error = 'FILE_IS_NOT_IMAGE';
    }
    else {
        let fieldData = {
            // weird bug where i is a string
            field: field,
            s3ExtraData: getPhotoDetails( { rawValue: file } ),
            preview: getImagePreview( { rawValue: file } )
        };

        if (checkImageRestrictions(
                file.width, file.height, minWidth, maxWidth, minHeight, maxHeight, fixedWidth, fixedHeight, ratioWidthHeight
            )) {
            // onChange && onChange(field, file);
            // onBlur && onBlur();
            postPhotoToS3( fieldData );
            // addPhoto && addPhoto();
        }
        else {
            error = 'FILE_IS_INVALID';
        }
        // }
    }
    if (error) {
        showAlert( error );
    }
}

export function getPhotoDetails( formData: { rawValue: any } ) {
    return {
        file: {
            uri: formData.rawValue.path,
            type: formData.rawValue.mime,  // used by android
        },
        'Content-Type': formData.rawValue.mime
    }
}

export function getImagePreview( formData: { rawValue: any } ): string {
    if (formData && formData.rawValue) {
        return formData.rawValue.path || formData.rawValue.url || formData.rawValue;
    }
    return "";
}
