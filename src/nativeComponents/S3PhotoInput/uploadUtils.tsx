import { InjectedTranslateProps } from "react-i18next";
import { AWS_S3 } from "../../utils/enums";
import { FILE_IS_NOT_IMAGE, PHOTO_INCORRECT_RATIO, PHOTO_INCORRECT_SIZE } from "../..";
import { FieldStateProps } from "../../redux/FormComponents/FormComponents.types";
import { ConnectedProps, S3PhotoComponentDBValue, S3PhotoInputComponentProps } from "./S3PhotoInputComponent.types";

declare global {
    interface Window {
        webkitURL?: string;
    }
}

export function onDrop( files: Array<File>, props: S3PhotoInputComponentProps & ConnectedProps & FieldStateProps<S3PhotoComponentDBValue> & InjectedTranslateProps ) {
    let {
        field, lastPhotoIndex, multiple, postPhotoToS3, showAlert, t,
        minWidth, maxWidth, minHeight, maxHeight, fixedWidth, fixedHeight, ratioWidthHeight,
    } = props;
    let file = files[0];
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

export function getPhotoDetails( formData: { rawValue: { type: string } } ) {
    return {
        file: formData.rawValue,
        'Content-Type': formData.rawValue.type,
    }
}

export function getImagePreview( formData: { rawValue: any } ): string {
    if (formData && formData.rawValue) {
        return formData.rawValue.preview || formData.rawValue.url || formData.rawValue;
    }
    return "";
}

export function getImageUrl( url: string | any ): string | any {
    if (!url) {
        return '';
    }
    if (typeof( url ) === "string" && ( url.startsWith( 'clients' ) || url.startsWith( 'assets' ) )) {
        return AWS_S3 + url;
    }
    return url;
}

export function checkImageRestrictions( showAlert: Function,
                                        t: Function,
                                        width: number,
                                        height: number,
                                        minWidth?: number,
                                        maxWidth?: number,
                                        minHeight?: number,
                                        maxHeight?: number,
                                        fixedWidth?: number,
                                        fixedHeight?: number,
                                        ratioWidthHeight?: number, ): boolean {
    if (ratioWidthHeight) {
        if (width / height !== ratioWidthHeight) {
            showAlert(
                t(
                    PHOTO_INCORRECT_RATIO,
                    {
                        expectedRatio: 1 / ratioWidthHeight,
                        gotRatio: height / width,
                    }
                ),
                {},
                PHOTO_INCORRECT_RATIO
            );
            return false;
        }
    }
    if (fixedHeight && fixedWidth) {
        if (width !== fixedWidth || height !== fixedHeight) {
            showAlert(
                t(
                    PHOTO_INCORRECT_SIZE,
                    {
                        expectedWidth: fixedWidth,
                        expectedHeight: fixedHeight,
                        gotWidth: width,
                        gotHeight: height
                    }
                ),
                {},
                PHOTO_INCORRECT_SIZE
            );
            return false;
        }
    }
    else {
        if (minWidth && minHeight) {
            if (width < minWidth || height < minHeight) {
                showAlert(
                    t(
                        PHOTO_INCORRECT_SIZE,
                        {
                            expectedWidth: minWidth,
                            expectedHeight: minHeight,
                            gotWidth: width,
                            gotHeight: height
                        }
                    ),
                    {},
                    PHOTO_INCORRECT_SIZE
                );
                return false;
            }
        }
        if (maxWidth && maxHeight) {
            if (width > maxWidth || height > maxHeight) {
                showAlert(
                    t(
                        PHOTO_INCORRECT_SIZE,
                        {
                            expectedWidth: maxWidth,
                            expectedHeight: maxHeight,
                            gotWidth: width,
                            gotHeight: height
                        }
                    ),
                    {},
                    PHOTO_INCORRECT_SIZE
                );
                return false;
            }
        }
    }
    return true;
}
