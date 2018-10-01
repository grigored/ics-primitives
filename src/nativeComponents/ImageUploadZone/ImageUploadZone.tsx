import * as React from 'react';
import * as ReactDropzone from 'react-dropzone';
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { UPLOAD_PHOTO_HELPER } from "../..";
import { createStyles, Image, Text, View, WithStyles } from "../../";
import { getStyleProps } from "../../utils/web";
import { OwnProps } from './ImageUploadZone.types';

const styles = () => ( {
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
} );

type Props = OwnProps & WithStyles & InjectedTranslateProps

class CImageUploadZone extends React.PureComponent<Props, {}> {
    render() {
        let {
                classes, removePhoto, dropzoneStyle, multiple, photoPreview, s3Url, disableClick, onDrop, accept, t,
                addPhotoIcon, removePhotoIcon,
            } = this.props,
            Dropzone: any = ReactDropzone as any;
        // react-dropzone's typescript definitions seem to be broken
        // https://github.com/react-dropzone/react-dropzone/issues/509#issuecomment-341902236
        return (
            <Dropzone
                {...getStyleProps( dropzoneStyle )}
                disableClick={disableClick}
                onDrop={onDrop}
                accept={accept}
                multiple={multiple}
            >
                {
                    photoPreview
                        ? <Image
                            style={classes.image}
                            source={{ uri: photoPreview }}
                            s3Url={s3Url}
                            openOnClick={true}
                        />
                        : <View style={classes.helperContainer}>
                            <Image source={addPhotoIcon}/>
                            <Text>{t( UPLOAD_PHOTO_HELPER )}</Text>
                        </View>
                }
                {
                    photoPreview &&
                    <Image
                        style={classes.deletePhoto}
                        source={removePhotoIcon}
                        color={'#fff'}
                        onPress={() => {
                            removePhoto();
                        }}
                    />
                }

            </Dropzone>
        );
    }
}

const componentName = 'ImageUploadZone';
export const ImageUploadZone = compose(
    translate(),
    createStyles( styles, componentName ),
)( CImageUploadZone ) as React.ComponentType<OwnProps>;
