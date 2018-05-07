/**
 * Created by alexbuicescu on 18 - Aug 2017.
 */

import * as React from 'react';
import { createStyles, pushScreen, WithStyles } from '../../';
import { routes } from '../../redux/reducers/navigation';
import { ActionSheetNativeProps, connectActionSheet } from '../../utils/addActionSheet.native';
import { TouchableWithoutFeedback } from 'react-native';
import { Image as ImageInterface, openPicker, openCamera } from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ACTION_SHEETS_IDS } from '../../utils/enums';
import { StyleRules } from '../../utils/theme.types';
import { checkForCameraPermission } from '../../primitives/Camera/utils.native';
import { Image } from '../../primitives/Image/Image';
import { View } from '../../primitives/View/View';
import { Props } from './ImageUploadZone.types';

const styles: StyleRules = {
    addNewPhoto: {
        tintColor: '#f00',
        width: 70,
        height: 70,
    },
    loadingContainer: {
        backgroundColor: '#fff',
        opacity: 0.7,
        position: 'absolute',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

interface ConnectedProps {
    pushScreen: typeof pushScreen,
}

type AllProps = Props & ConnectedProps & WithStyles & ActionSheetNativeProps;

class CImageUploadZone extends React.PureComponent<AllProps, {}> {

    static actionSheetData = ( props: AllProps ) => ({
        [ACTION_SHEETS_IDS.IMAGE_CLICK]: {
            options: props.photoPreview && !props.multiple
                ? ['View', 'Album', 'Camera', 'Cancel']
                : ['Album', 'Camera', 'Cancel'],
            optionClick: ( index: number ) => {
                if (!props.photoPreview || props.multiple) {
                    // ignore 0(View) if it is not available
                    index++;
                }
                switch (index) {
                    case 0:
                        props.pushScreen(
                            props.navigation,
                            null,
                            routes.FULL_SCREEN_IMAGE,
                            {
                                images: [{url: props.photoPreview}],
                                index
                            },
                        );
                        break;
                    case 1:
                    case 2:
                        let getImage = index === 1 ? openPicker : openCamera;
                        checkForCameraPermission(index === 1 ? 'album' : 'camera', props.showAlert)
                            .then(( success: boolean ) => {
                                if (!success) {
                                    return;
                                }
                                getImage({
                                    width: 300,
                                    height: 300,
                                    cropping: false,
                                    // includeBase64: true,
                                    multiple: props.multiple,
                                    maxFiles: 20,
                                }).then(( image: ImageInterface | Array<ImageInterface> ) => {
                                    if (props.multiple) {
                                        props.onDrop(image);
                                    }
                                    else {
                                        props.onDrop([image]);
                                    }
                                }).catch(() => {
                                    console.log('fail');
                                });
                            });
                        break;
                    case 3:
                        break;
                }
            }
        },
    });

    render() {
        let {
            classes, uploadSuccess, uploading, dropzoneStyle, multiple, photoPreview, connectedShowActionSheet,
        } = this.props;
        let imageSource = photoPreview && !multiple ? {uri: photoPreview} : undefined;
        if (uploadSuccess === false && uploading === false) {
            // imageSource = iconList.addPhoto;
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    connectedShowActionSheet(ACTION_SHEETS_IDS.IMAGE_CLICK);
                }}>
                <View>
                    {photoPreview && photoPreview.startsWith('http') ?
                        //for now NetworkImage doesn't support local images as source, so we use the default Image component
                        <Image
                            style={
                                [
                                    photoPreview && !multiple ? {width: 70, height: 70} : classes.addNewPhoto,
                                    dropzoneStyle
                                ]
                            }
                            resizeMode={'cover'}
                            source={imageSource}
                        />
                        :
                        <Image
                            style={
                                [
                                    photoPreview && !multiple
                                        ? {width: 70, height: 70, resizeMode: 'cover'}
                                        : classes.addNewPhoto,
                                    dropzoneStyle
                                ]
                            }

                            source={imageSource}
                        />
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const componentName = 'ImageUploadZone';
export const ImageUploadZone = compose(
    connectActionSheet,
    connect(
        ( state: any, ownProps: Props ) => ({}),
        {
            pushScreen,
        }
    ),
    createStyles(styles, componentName),
)(CImageUploadZone) as React.ComponentType<Props>;
