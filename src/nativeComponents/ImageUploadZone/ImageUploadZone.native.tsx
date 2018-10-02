import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Image as ImageInterface } from 'react-native-image-crop-picker';
import { connect } from "react-redux";
import { compose } from "redux";
import { GlobalState } from "src/redux/FormComponents/FormComponents.types";
import { ACTION_SHEETS_IDS } from "src/utils/enums";
import { appTheme, createStyles, History, Image, Navigation, showAlert, View, WithStyles } from "../..";
import { checkForCameraPermission } from "../../primitives/Camera/cameraUtils";
import { NetworkImage } from "../../primitives/NetworkImage/NetworkImage";
import { showActionSheet } from "../../redux/reducers/dialog";
import { pushScreen, routes } from '../../redux/reducers/navigation';
import { connectActionSheet } from "../../utils/addActionSheet.native";
import { OwnProps } from "./ImageUploadZone.types";

const styles = () => ( {
    addNewPhoto: {
        tintColor: appTheme.primaryColor,
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
} );

interface ConnectedProps {
    pushScreen: typeof pushScreen,
    showAlert: typeof showAlert,
    showActionSheet: typeof showActionSheet,
    connectedShowActionSheet: any,
}

type AllProps = OwnProps & ConnectedProps & WithStyles & Navigation & History;

class CImageUploadZone extends React.PureComponent<AllProps, {}> {

    static actionSheetData = ( props: AllProps ) => ( {
        [ACTION_SHEETS_IDS.IMAGE_CLICK]: {
            options: props.photoPreview && !props.multiple
                ? ['View', 'Album', 'Camera', 'Cancel']  // todo View throws error
                : ['Album', 'Camera', 'Cancel'],
            optionClick: ( index: number ) => {
                if (!props.photoPreview || props.multiple) {
                    index++;
                }
                let options = {
                    width: 300,
                    height: 300,
                    cropping: false,
                    // includeBase64: true,
                    multiple: props.multiple,
                    maxFiles: 20,
                };
                switch (index) {
                    case 0:
                        props.pushScreen(
                            props.navigation,
                            null,
                            routes.FULL_SCREEN_IMAGE,
                            {
                                images: [{ url: props.photoPreview }],
                                index
                            },
                        );
                        break;
                    case 1:
                        // @ts-ignore
                        const { ImagePicker } = Expo;
                        checkForCameraPermission( 'camera_roll', props.showAlert )
                            .then( ( success: boolean ) => {
                                if (success) {
                                    ImagePicker.launchImageLibraryAsync( options )
                                        .then( ( image: ImageInterface | Array<ImageInterface> ) => {
                                            if (props.multiple) {
                                                props.onDrop( image, [] );
                                            } else {
                                                props.onDrop( [image], [] );
                                            }
                                        } )
                                        .catch( ( e: any ) => {console.log( 'err', e )} )
                                } else {
                                }
                            } )
                            .catch( ( e: any ) => {console.log( 'err', e )} );
                        break;
                    case 2:
                        // @ts-ignore
                        const { ImagePicker } = Expo;
                        checkForCameraPermission( 'camera', props.showAlert )
                            .then( ( success: boolean ) => {
                                if (!success) {
                                    return;
                                }
                                ImagePicker.launchCameraAsync( options )
                                    .then( ( image: ImageInterface | Array<ImageInterface> ) => {
                                        if (props.multiple) {
                                            props.onDrop( image, [] );
                                        } else {
                                            props.onDrop( [image], [] );
                                        }
                                    } )
                                    .catch( ( e: any ) => {
                                    } );
                            } );
                        break;
                    case 3:
                        break;
                }
            }
        },
    } );

    render() {
        let {
            classes, uploadSuccess, uploading, dropzoneStyle, multiple, photoPreview,
            addPhotoIcon, connectedShowActionSheet
        } = this.props;
        let imageSource = photoPreview && !multiple ? { uri: photoPreview } : addPhotoIcon;
        if (uploadSuccess === false && uploading === false) {
            imageSource = addPhotoIcon;
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    connectedShowActionSheet( ACTION_SHEETS_IDS.IMAGE_CLICK );
                }}
            >
                <View>
                    {photoPreview && photoPreview.startsWith( 'http' ) ?
                        //for now NetworkImage doesn't support local images as source, so we use the default Image component
                        <NetworkImage
                            style={
                                [
                                    photoPreview && !multiple ? { width: 70, height: 70 } : classes.addNewPhoto,
                                    dropzoneStyle
                                ]
                            }
                            resizeMode={'cover'}
                            source={imageSource}
                            icon={addPhotoIcon}
                        />
                        :
                        <Image
                            style={
                                [
                                    photoPreview && !multiple
                                        ? { width: 70, height: 70, resizeMode: 'cover' }
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
    connect(
        ( state: GlobalState, ownProps: OwnProps ) => ( {} ),
        {
            pushScreen,
            showAlert,
            // showActionSheet,
        }
    ),
    connectActionSheet,
    createStyles( styles, componentName ),
)( CImageUploadZone ) as React.ComponentType<OwnProps>;
