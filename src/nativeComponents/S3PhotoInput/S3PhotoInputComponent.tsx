import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { postPhotoToS3, removePhoto } from "../../redux/reducers/s3upload";
import {
    Alert, all, CAMERA_PERMISSION_IS_DENIED, CircularProgressComponent, createStyles, FILE_IS_NOT_IMAGE, History,
    isWeb, Navigation, PHOTO_INCORRECT_RATIO, PHOTO_INCORRECT_SIZE, PHOTO_PERMISSION_IS_DENIED, showAlert, Text,
    UPLOAD_FAILED, View, web, WithStyles
} from "../..";
import { FieldStateProps, GlobalState } from "../../redux/FormComponents/FormComponents.types";
import { ImageUploadZone } from "../ImageUploadZone/ImageUploadZone";
import { ConnectedProps, S3PhotoComponentDBValue, S3PhotoInputComponentProps } from "./S3PhotoInputComponent.types";
import { getImageUrl, onDrop } from "./uploadUtils";

const ACCEPTED_MIMES = 'image/png, image/jpg, image/jpeg';

const styles = () => ( {
    container: {
        flexDirection: 'column',
    },
    component: {
        position: 'relative',
        [web]: {
            width: 200,
            height: 200,
        },
        [all]: {
            width: 140,
            height: 140,
        },

    },
    dropzone: {
        width: '100%',
        height: '100%',
        [web]: {
            borderWidth: 2,
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: 5,
            boxSizing: 'border-box',
        },
    },
} );

type OwnProps = S3PhotoInputComponentProps & FieldStateProps<S3PhotoComponentDBValue>
type AllProps = OwnProps & ConnectedProps & WithStyles & Navigation & History & InjectedTranslateProps

class CS3PhotoInputComponent extends React.Component<AllProps, {}> {

    // static alertsData = ( props: AllProps ) => ( {
    //     [DIALOG_IDS.FILE_IS_NOT_IMAGE]: {
    //         title: ERROR,
    //         body: FILE_IS_NOT_IMAGE
    //     },
    //     [DIALOG_IDS.PERMISSION_DENIED_CAMERA]: {
    //         body: CAMERA_PERMISSION_IS_DENIED,
    //         cancelButton: {},
    //         okButton: {
    //             onPress: () => {
    //                 goToSettings( props );
    //             }
    //         }
    //     },
    //     [DIALOG_IDS.PERMISSION_DENIED_ALBUM]: {
    //         body: PHOTO_PERMISSION_IS_DENIED,
    //         cancelButton: {},
    //         okButton: {
    //             onPress: () => {
    //                 goToSettings( props );
    //             }
    //         }
    //     },
    // } );

    componentWillReceiveProps( nextProps: AllProps ) {
        if (this.props.uploadingPhotoToS3 && !nextProps.uploadingPhotoToS3) {
            let url: string = '';
            if (nextProps.uploadingPhotoToS3Success) {
                url = nextProps.s3Url ? nextProps.s3Url : '';
            }
            this.props.onChange && this.props.onChange( url, url );
        } else if (!this.props.photoPreview && nextProps.photoPreview) {
            const { photoPreview } = nextProps;
            this.props.onChange && this.props.onChange( photoPreview, photoPreview );
        }
    }

    componentWillUnmount() {
        let { removePhoto, field, } = this.props;
        removePhoto( field );
    }

    render() {
        let {
                title, field,
                error, multiple, classes, componentStyle, containerStyle,
                uploadingPhotoToS3, uploadingPhotoToS3Success, additionalOnDrop,
                removePhoto, value, t, addPhotoIcon, removePhotoIcon
            } = this.props,
            isError = !!error || ( uploadingPhotoToS3Success === false && uploadingPhotoToS3 === false );

        multiple = !!multiple; // multiple is optional so we are setting undefined as false

        return (
            <View style={[classes.container, ...( containerStyle || [] )]}>
                {!multiple && !!title &&
                <Text style={[classes.baseLabelText, isError && classes.baseLabelErrorText]}>{t( title )}</Text>}
                <View style={[classes.component, componentStyle]}>
                    <ImageUploadZone
                        disableClick={!!value}
                        dropzoneStyle={classes.dropzone}
                        onDrop={( files: any ) => {
                            onDrop( files, this.props );
                            additionalOnDrop && additionalOnDrop( files );
                        }}
                        photoPreview={getImageUrl( value )}
                        s3Url={getImageUrl( value )}
                        accept={ACCEPTED_MIMES}
                        multiple={isWeb ? false : multiple}
                        removePhoto={() => {
                            removePhoto( field );
                            this.props.onChange && this.props.onChange( '' );
                        }}
                        uploading={uploadingPhotoToS3}
                        uploadSuccess={uploadingPhotoToS3Success}
                        addPhotoIcon={addPhotoIcon}
                        removePhotoIcon={removePhotoIcon}

                    />
                    {
                        uploadingPhotoToS3 &&
                        <View style={{
                            backgroundColor: '#fff',
                            opacity: 0.7,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                        }}>
                            <CircularProgressComponent/>
                        </View>
                    }
                </View>
                {
                    !multiple && error &&
                    <Text style={classes.baseErrorText}>{error}</Text>
                }
                {
                    !multiple && uploadingPhotoToS3Success === false && uploadingPhotoToS3 === false &&
                    <Text style={classes.baseErrorText}>{t( UPLOAD_FAILED )}</Text>
                }
                <Alert alertId={FILE_IS_NOT_IMAGE} leftButtonText={"OK"}/>
                <Alert alertId={CAMERA_PERMISSION_IS_DENIED} leftButtonText={"OK"}/>
                <Alert alertId={PHOTO_PERMISSION_IS_DENIED} leftButtonText={"OK"}/>
                <Alert alertId={PHOTO_INCORRECT_RATIO} leftButtonText={"OK"}/>
                <Alert alertId={PHOTO_INCORRECT_SIZE} leftButtonText={"OK"}/>
            </View>
        );
    }
}

const componentName = 'S3PhotoInputComponent';
export const S3PhotoInputComponent: React.ComponentType<OwnProps> = compose(
    connect(
        ( state: GlobalState, ownProps: OwnProps ) => ( {
            uploadingPhotoToS3: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].uploading,
            uploadingPhotoToS3Success: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].uploadSuccess,
            photoPreview: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].preview,
            s3Url: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].s3Key,
        } ), {
            postPhotoToS3,
            removePhoto,
            showAlert,
        }
    ),
    createStyles( styles, componentName ),
    translate(),
)( CS3PhotoInputComponent ) as React.ComponentType<OwnProps>;
