/**
 * Created by alexbuicescu on 18 - Aug 2017.
 */

import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import {checkImageRestrictions} from "./common";
import { ConnectedProps, S3PhotoInputComponentProps } from './S3PhotoInputComponent.types';
import { S3PhotoComponentDBValue } from './S3PhotoInputComponent.types';


declare global {
    interface Window {
        webkitURL?: string;
    }
}

export function onDrop(files: Array<File>, props: S3PhotoInputComponentProps & ConnectedProps & FieldStateProps<S3PhotoComponentDBValue>) {
    let {
        field, lastPhotoIndex, multiple, postPhotoToS3, showAlert,
        minWidth, maxWidth, minHeight, maxHeight, fixedWidth, fixedHeight, ratioWidthHeight,
    } = props;
    let file = files[0];
    let _URL = window.URL || window.webkitURL;

    if (!file.type.match('image.*')) {
        showAlert('FILE_IS_NOT_IMAGE');
        return;
    }

    let img = new Image();
    img.onload = function () {
        if (checkImageRestrictions(
            img.width, img.height, minWidth, maxWidth, minHeight, maxHeight, fixedWidth, fixedHeight, ratioWidthHeight
            )) {
            // do something

            let fieldData = {
                field: multiple ? `${field},${lastPhotoIndex}.url` : field,
                s3ExtraData: getPhotoDetails({rawValue: file}),
                preview: getImagePreview({rawValue: file})
            };

            postPhotoToS3(fieldData);
        }
    };
    img.onerror = function () {
        //setErrorForField(formName, field, _t(FILE_IS_NOT_IMAGE));
        showAlert('FILE_IS_NOT_IMAGE');
    };
    img.src = _URL.createObjectURL(file);
}

export function getPhotoDetails(formData: {rawValue: {type: string}}) {
    return {
        file: formData.rawValue,
        'Content-Type': formData.rawValue.type,
    }
}

export function getImagePreview(formData: {rawValue: any}): string {
    if (formData && formData.rawValue) {
        return formData.rawValue.preview || formData.rawValue.url || formData.rawValue;
    }
    return "";
}
