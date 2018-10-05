import { AWS_S3 } from "../../utils/enums";
import { PHOTO_INCORRECT_RATIO, PHOTO_INCORRECT_SIZE } from "../..";

export function getImageUrl( url: string | any ): string | any {
    if (!url) {
        return '';
    }
    return AWS_S3 + url;
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

export function getPhotoDetails( formData: { rawValue: { type: string } | any } ) {
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
