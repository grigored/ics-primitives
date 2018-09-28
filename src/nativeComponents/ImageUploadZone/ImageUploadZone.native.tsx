import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { GlobalState } from "src/redux/FormComponents/FormComponents.types";
import { NetworkImage } from "../../primitives/NetworkImage/NetworkImage";
import { appTheme, View, WithStyles, Image, createStyles } from "../..";
import { pushScreen } from '../../redux/reducers/navigation';
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
    // showActionSheet: typeof showActionSheet,
}

type AllProps = OwnProps & ConnectedProps & WithStyles;

class CImageUploadZone extends React.PureComponent<AllProps, {}> {

    // static actionSheetData = (props: AllProps) => ({
    //     [ACTION_SHEETS_IDS.IMAGE_CLICK]: {
    //         options: props.photoPreview && !props.multiple
    //             ? ['View', 'Album', 'Camera', 'Cancel']
    //             : ['Album', 'Camera', 'Cancel'],
    //         optionClick: (index: number) => {
    //             if (!props.photoPreview || props.multiple) {
    //                 // ignore 0(View) if it is not available
    //                 index++;
    //             }
    //             switch (index) {
    //                 case 0:
    //                     props.pushScreen(
    //                         props.navigation,
    //                         null,
    //                         routeDefinitions.FULL_SCREEN_IMAGE,
    //                         null,
    //                         null,
    //                         null,
    //                         {
    //                             images: [{url: props.photoPreview}],
    //                             index
    //                         },
    //                     );
    //                     break;
    //                 case 1:
    //                 case 2:
    //                     let getImage = index === 1 ? ImagePicker.openPicker : ImagePicker.openCamera;
    //                     checkForCameraPermission(index === 1 ? 'album' : 'camera', props.displayAlert)
    //                         .then((success: boolean) => {
    //                             if (!success) {
    //                                 return;
    //                             }
    //                             getImage({
    //                                 width: 300,
    //                                 height: 300,
    //                                 cropping: false,
    //                                 // includeBase64: true,
    //                                 multiple: props.multiple,
    //                                 maxFiles: 20,
    //                             }).then((image: ImageInterface | Array<ImageInterface>) => {
    //                                 if (props.multiple) {
    //                                     props.onDrop(image);
    //                                 }
    //                                 else {
    //                                     props.onDrop([image]);
    //                                 }
    //                             }).catch(() => {
    //                                 console.log('fail');
    //                             });
    //                         });
    //                     break;
    //                 case 3:
    //                     break;
    //             }
    //         }
    //     },
    // });

    render() {
        let {
            classes, uploadSuccess, uploading, dropzoneStyle, multiple, photoPreview,
            addPhotoIcon,
        } = this.props;
        let imageSource = photoPreview && !multiple ? { uri: photoPreview } : addPhotoIcon;
        if (uploadSuccess === false && uploading === false) {
            imageSource = addPhotoIcon;
        }
        return (
            <TouchableWithoutFeedback
                // onPress={() => {
                //     connectedShowActionSheet( ACTION_SHEETS_IDS.IMAGE_CLICK );
                // }}
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
    ( state: GlobalState, ownProps: OwnProps ) => ( {} ), {
        pushScreen,
        // showActionSheet,
    }
),
    createStyles(styles, componentName),
)(CImageUploadZone) as React.ComponentType<OwnProps>;
