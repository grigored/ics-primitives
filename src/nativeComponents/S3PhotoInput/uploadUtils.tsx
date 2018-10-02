import { InjectedTranslateProps } from "react-i18next";
import { checkImageRestrictions, getImagePreview, getImageUrl, getPhotoDetails } from "./common";
import { FILE_IS_NOT_IMAGE} from "../..";
import { FieldStateProps } from "../../redux/FormComponents/FormComponents.types";
import { ConnectedProps, S3PhotoComponentDBValue, S3PhotoInputComponentProps } from "./S3PhotoInputComponent.types";

declare global {
    interface Window {
        webkitURL?: string;
    }
}

export function onDrop( acceptedFiles: Array<File>,
                        rejectedFiles: Array<File>,
                        props: S3PhotoInputComponentProps &
                            ConnectedProps &
                            FieldStateProps<S3PhotoComponentDBValue> &
                            InjectedTranslateProps ) {
    let {
        field, lastPhotoIndex, multiple, postPhotoToS3, showAlert, t,
        minWidth, maxWidth, minHeight, maxHeight, fixedWidth, fixedHeight, ratioWidthHeight,
    } = props;
    let file = acceptedFiles[0];
    let _URL = window.URL || window.webkitURL;

    if (!file.type.match( 'image.*' )) {
        showAlert( FILE_IS_NOT_IMAGE );
        return;
    }

    let img = new Image();
    img.onload = function () {
        if (checkImageRestrictions(
                showAlert,
                t,
                img.width,
                img.height,
                minWidth,
                maxWidth,
                minHeight,
                maxHeight,
                fixedWidth,
                fixedHeight,
                ratioWidthHeight
            )) {

            let fieldData = {
                field: multiple ? `${field},${lastPhotoIndex}.url` : field,
                url: 'get_s3_upload_params',  // todo
                s3ExtraData: getPhotoDetails( { rawValue: file } ),
                preview: getImageUrl( getImagePreview( { rawValue: file } ) )
            };

            postPhotoToS3( fieldData );
        }
    };
    img.onerror = function () {
        showAlert( FILE_IS_NOT_IMAGE, {}, t( FILE_IS_NOT_IMAGE ) );
    };
    img.src = _URL.createObjectURL( file );
}
