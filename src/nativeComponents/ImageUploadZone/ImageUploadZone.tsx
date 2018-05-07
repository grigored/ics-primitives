/**
 * Created by alexbuicescu on 18 - Aug 2017.
 */

import * as React from "react";
import * as Dropzone from "react-dropzone";
import { InjectedTranslateProps, translate } from 'react-i18next';
import { compose } from 'redux';
import { Button, createStyles, WithStyles } from '../../';
import {Text} from "../../primitives/Text/Text";
import {View} from "../../primitives/View/View";
import {Image} from "../../primitives/Image/Image";
import { getImageUrl } from '../../utils/common';
import { UPLOAD_PHOTO_HELPER } from '../../utils/strings';
import { StyleRules } from '../../utils/theme.types';
import { getStyleProps } from '../../utils/web';
import {Props} from "./ImageUploadZone.types";

const styles: StyleRules = {
    helperContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    deletePhoto: {
        position: 'absolute',
        right: 0,
        top: 0,
        marginTop: 4,
        marginRight: 4,
        width: 32,
        height: 32,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        padding: 4,
    },
    image: {
        backgroundSize: 'cover',
        position: 'absolute',
        maxHeight: '100%',
        maxWidth: '100%',
        margin: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        boxSizing: 'border-box',
    },
};

class CImageUploadZone extends React.PureComponent<Props & WithStyles & InjectedTranslateProps, {}> {
    render() {
        let {
            classes, removePhoto, dropzoneStyle, multiple, photoPreview, s3Url, disableClick, onDrop, accept, t
        } = this.props;
        return <Dropzone
            {...getStyleProps(dropzoneStyle)}
            disableClick={disableClick}
            onDrop={onDrop}
            accept={accept}
            multiple={multiple}
        >
            {
                photoPreview
                    ? <Image
                        style={classes.image}
                        source={{uri: getImageUrl(s3Url, photoPreview)}}
                        s3Url={getImageUrl(s3Url, photoPreview)}
                        openOnClick={true}
                    />
                    : <View style={classes.helperContainer}>
                        <Text>{t(UPLOAD_PHOTO_HELPER)}</Text>
                    </View>
            }
            {
                photoPreview &&
                <Button
                    title={'Remove photo'}
                    onPress={() => {
                        removePhoto();
                    }}
                />
            }

        </Dropzone>
    }
}

const componentName = 'ImageUploadZone';
export const ImageUploadZone = compose(
    translate(),
    createStyles(styles, componentName),
)(CImageUploadZone) as React.ComponentType<Props>;
