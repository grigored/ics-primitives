import * as React from "react";
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from "react-redux";
import { compose } from 'redux';
import { goToSettings } from "../../primitives/Camera/utils";
import { ImageUploadZone } from "../ImageUploadZone/ImageUploadZone";
import { Text } from "../../primitives/Text/Text";
import { View } from "../../primitives/View/View";
import { FieldStateProps } from '../../redux/FormComponents/FormComponents.types';
import { postPhotoToS3, removePhoto } from "../../redux/reducers/s3upload";
import { Alert, all, CircularProgressComponent, createStyles, isWeb, Navigation, web, WithStyles } from '../../';
import { CANCEL, OK, UPLOAD_FAILED } from '../../utils/strings';
import { StyleRules } from '../../utils/theme.types';
import { ConnectedProps, S3PhotoComponentDBValue, S3PhotoInputComponentProps } from './S3PhotoInputComponent.types';
import { onDrop } from "./utils";

const ACCEPTED_MIMES = 'image/png, image/jpg, image/jpeg';

// let styles: StyleRules<ClassNames> = {
let styles: StyleRules = {
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
};

export type OwnProps = S3PhotoInputComponentProps & FieldStateProps<S3PhotoComponentDBValue> & Navigation;
type AllProps = OwnProps & ConnectedProps & WithStyles & InjectedTranslateProps;

class CS3PhotoInputComponent extends React.Component<AllProps, {}> {

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
            title, field, t,
            error, multiple, classes, componentStyle, containerStyle,
            uploadingPhotoToS3, uploadingPhotoToS3Success, additionalOnDrop, navigation,
            removePhoto, value,
        } = this.props;
        let thisProps = this.props,
            isError = !!error || ( uploadingPhotoToS3Success === false && uploadingPhotoToS3 === false );

        multiple = !!multiple; // multiple is optional so we are setting undefined as false

        return (
            <View style={[classes.container, ...( containerStyle || [] )]}>
                {!multiple && !!title &&
                <Text style={[classes.baseLabelText, isError && classes.baseLabelErrorText]}>{t( title )}</Text>}
                <View style={[classes.component, componentStyle]}>
                    <ImageUploadZone
                        navigation={navigation}
                        disableClick={!!value}
                        dropzoneStyle={classes.dropzone}
                        onDrop={( files: any ) => {
                            onDrop( files, thisProps );
                            additionalOnDrop && additionalOnDrop( files );
                        }}
                        photoPreview={value}
                        s3Url={value}
                        accept={ACCEPTED_MIMES}
                        multiple={isWeb ? false : multiple}
                        removePhoto={() => {
                            removePhoto( field );
                            this.props.onChange && this.props.onChange( '' );
                        }}
                        uploading={uploadingPhotoToS3}
                        uploadSuccess={uploadingPhotoToS3Success}
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
                <Alert
                    alertId={'FILE_IS_NOT_IMAGE'}
                />
                <Alert
                    alertId={'PERMISSION_DENIED_CAMERA'}
                    leftButtonText={t(CANCEL)}
                    rightButtonText={t(OK)}
                    rightButtonOnPress={() => {
                        goToSettings( thisProps );
                    }}
                />
                <Alert
                    alertId={'PERMISSION_DENIED_ALBUM'}
                    leftButtonText={t(CANCEL)}
                    rightButtonText={t(OK)}
                    rightButtonOnPress={() => {
                        goToSettings( thisProps );
                    }}
                />
            </View>
        );
    }
}

const componentName = 'S3PhotoInputComponent';
export const S3PhotoInputComponent = compose(
    translate(),
    connect(
        ( state: any, ownProps: OwnProps ) => ( {
            uploadingPhotoToS3: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].uploading,
            uploadingPhotoToS3Success: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].uploadSuccess,
            photoPreview: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].preview,
            s3Url: state.s3upload[ownProps.field] && state.s3upload[ownProps.field].s3Key,
        } ), {
            postPhotoToS3,
            removePhoto
        }
    ),
    createStyles(styles, componentName),
)(CS3PhotoInputComponent) as React.ComponentType<OwnProps>;
