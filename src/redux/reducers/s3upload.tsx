export enum TypeKeys {
    POST_S3_DATA = 'instacar/s3upload/POST_S3_DATA',
    POST_S3_DATA_SUCCESS = 'instacar/s3upload/POST_S3_DATA_SUCCESS',
    POST_S3_DATA_FAIL = 'instacar/s3upload/POST_S3_DATA_FAIL',

    GET_S3_PHOTO_INFO = 'instacar/s3upload/GET_S3_PHOTO_INFO',
    GET_S3_PHOTO_INFO_SUCCESS = 'instacar/s3upload/GET_S3_PHOTO_INFO_SUCCESS',
    GET_S3_PHOTO_INFO_FAIL = 'instacar/s3upload/GET_S3_PHOTO_INFO_FAIL',

    REMOVE_PHOTO = 'instacar/s3upload/REMOVE_PHOTO',
}

export interface IField {
    field: string,
    preview: string,
    s3ExtraData: {
        file: any,
        'Content-Type': string,
    },
}

export interface PostS3DataAction {
    type: TypeKeys.POST_S3_DATA,
    field: IField,
}

export interface PostS3DataSuccessAction {
    type: TypeKeys.POST_S3_DATA_SUCCESS,
    field: IField,
    s3Key: string,
    preview: string,
}

export interface PostS3DataFailAction {
    type: TypeKeys.POST_S3_DATA_FAIL,
    field: IField,
    s3Key: string,
    preview: string,
}

export interface GetS3PhotoInfoAction {
    type: TypeKeys.GET_S3_PHOTO_INFO,
    field: IField,
}

export interface GetS3PhotoInfoSuccessAction {
    type: TypeKeys.GET_S3_PHOTO_INFO_SUCCESS,
    field: IField,
    photo: string,
    s3Key: string,
    preview: string,

}

export interface GetS3PhotoInfoFailAction {
    type: TypeKeys.GET_S3_PHOTO_INFO_FAIL,
    field: IField,
}

export interface RemovePhotoAction {
    type: TypeKeys.REMOVE_PHOTO,
    field: string,
}


export type ActionTypes =
    | PostS3DataAction
    | PostS3DataSuccessAction
    | PostS3DataFailAction
    | GetS3PhotoInfoAction
    | GetS3PhotoInfoSuccessAction
    | GetS3PhotoInfoFailAction
    | RemovePhotoAction

export interface S3FieldData {
    preview: string,
    s3Key: string,
    uploadSuccess?: boolean,
    uploading?: boolean,
}

export interface S3UploadState {
    [field: string]: S3FieldData,
}

const removeItemFromDict = ( obj: S3UploadState, fieldName: string ): S3UploadState => {
    let newObj = {};
    for (let key in obj) {
        if (key !== fieldName) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

export const s3upload = ( state: S3UploadState = {}, action: ActionTypes ): S3UploadState => {
    switch (action.type) {
        case TypeKeys.POST_S3_DATA:
            return {
                ...state,
            };
        case TypeKeys.POST_S3_DATA_SUCCESS:
            return {
                ...state,
                [action.field.field]: {
                    uploadSuccess: true,
                    uploading: false,
                    s3Key: action.s3Key,
                    preview: action.preview,
                },
            };
        case TypeKeys.POST_S3_DATA_FAIL:
            return {
                ...state,
                [action.field.field]: {
                    uploadSuccess: false,
                    uploading: false,
                    preview: '',
                    s3Key: '',
                }
            };

        case TypeKeys.GET_S3_PHOTO_INFO:
            return {
                ...state,
                [action.field.field]: {
                    uploadSuccess: false,
                    uploading: true,
                    s3Key: '',
                    preview: action.field.preview,
                }
            };
        case TypeKeys.GET_S3_PHOTO_INFO_SUCCESS:
            return {
                ...state,
            };
        case TypeKeys.GET_S3_PHOTO_INFO_FAIL:
            return {
                ...state,
                [action.field.field]: {
                    uploadSuccess: false,
                    uploading: false,
                    s3Key: '',
                    preview: '',
                }
            };

        case TypeKeys.REMOVE_PHOTO:
            return {
                ...state,
                ...removeItemFromDict(state, action.field),
            };

        default:
            return state;
    }
}

export function postPhotoToS3( field: IField ) {
    return {
        s3Upload: true,
        method: 'get',
        url: 'file-upload',
        queryParameters: {nr_of_photos: 1},
        field,
        fields: [field],
        extraData: {field}
    }
}

export function removePhoto( field: string, ): RemovePhotoAction {
    return {
        type: TypeKeys.REMOVE_PHOTO,
        field,
    }
}
