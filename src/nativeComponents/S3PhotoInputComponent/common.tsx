/**
 * Created by alexbuicescu on 04 - May 2018.
 */


export function checkImageRestrictions(
    width: number,
    height: number,
    minWidth?: number,
    maxWidth?: number,
    minHeight?: number,
    maxHeight?: number,
    fixedWidth?: number,
    fixedHeight?: number,
    ratioWidthHeight?: number,
): boolean {
    if (ratioWidthHeight) {
        if (width / height !== ratioWidthHeight) {
            // alert(_t(
            //     PHOTO_INCORRECT_RATIO,
            //     {
            //         expectedRatio: 1 / ratioWidthHeight,
            //         gotRatio: height / width,
            //     }
            // ));
            return false;
        }
    }
    if (fixedHeight && fixedWidth) {
        if (width !== fixedWidth || height !== fixedHeight) {
            // alert(_t(
            //     PHOTO_INCORRECT_SIZE,
            //     {
            //         expectedWidth: fixedWidth,
            //         expectedHeight: fixedHeight,
            //         gotWidth: width,
            //         gotHeight: height
            //     }
            // ));
            return false;
        }
    }
    else {
        if (minWidth && minHeight) {
            if (width < minWidth || height < minHeight) {
                // alert(_t(
                //     PHOTO_INCORRECT_SIZE,
                //     {
                //         expectedWidth: minWidth,
                //         expectedHeight: minHeight,
                //         gotWidth: width,
                //         gotHeight: height
                //     }
                // ));
                return false;
            }
        }
        if (maxWidth && maxHeight) {
            if (width > maxWidth || height > maxHeight) {
                // alert(_t(
                //     PHOTO_INCORRECT_SIZE,
                //     {
                //         expectedWidth: maxWidth,
                //         expectedHeight: maxHeight,
                //         gotWidth: width,
                //         gotHeight: height
                //     }
                // ));
                // return false;
            }
        }
    }
    return true;
}
