import 'whatwg-fetch';
import { showAlert } from './reducers/navigation';
import { TypeKeys as S3UploadTypeKeys } from './reducers/s3upload';
import { encodeParametersInUrl } from './utils';

export const s3UploadMiddleware = <Dispatch extends Function, GlobalState>( baseUrl: string,
                                                                            baseHeaders: { [key: string]: string } = {} ) => ( {dispatch, getState}: { dispatch: Dispatch, getState: () => GlobalState } ) => {
    return ( next: any ) => ( action: any ) => {
        const {
            s3Upload,
            fields,
            field,
            method,
            formName,
            url,
            extraHeaders,
            body,
            queryParameters,
            requestPayload = {},
            successPayload = {},
            dispatchOnSuccess,
            failurePayload = {},
            dispatchOnFailure,
        } = action;

        if (!s3Upload) {
            // Normal action: pass it on
            return next(action)
        }

        dispatch({
            type: S3UploadTypeKeys.GET_S3_PHOTO_INFO,
            ...requestPayload,
        });

        // @ts-ignore
        const persistedHeaders = (getState().persisted && getState().persisted.headers) || {};

        let fetchParams = {
            method,
            body: JSON.stringify(body),
            headers: {...baseHeaders, ...persistedHeaders, ...(extraHeaders || {})},
        };

        return fetch(baseUrl + encodeParametersInUrl(url, queryParameters), fetchParams)
            .then(response =>
                response
                    .json()
                    .then(json => {
                        let actionType = S3UploadTypeKeys.GET_S3_PHOTO_INFO_FAIL,
                            extraData = failurePayload;

                        if (response.status >= 200 && response.status < 300) {
                            actionType = S3UploadTypeKeys.GET_S3_PHOTO_INFO_SUCCESS;
                            extraData = successPayload;
                            dispatchOnSuccess && dispatch(dispatchOnSuccess);
                        } else {
                            if (json.error) {
                                dispatch(showAlert(json.error));
                            } else {
                                dispatch(showAlert('API_ERROR'));
                            }
                            dispatchOnFailure && dispatch(dispatchOnFailure);
                        }

                        dispatch({
                            response: json,
                            type: actionType,
                            ...extraData
                        });

                        if (actionType === S3UploadTypeKeys.GET_S3_PHOTO_INFO_SUCCESS) {
                            // TODO show a message to the user that he can only upload max 20 files
                            let backendData = fields.length > 1 ? json : [json];
                            for (let i in backendData) {
                                let photo = fields[i].field,
                                    s3ExtraData = fields[i].s3ExtraData,
                                    s3Data = {...backendData[i], ...s3ExtraData},
                                    payload = {
                                        field,
                                        photo,
                                        formName,
                                        s3Key: s3Data.key,
                                        preview: fields[i].preview,
                                    };
                                dispatch({
                                    formTypes: [
                                        S3UploadTypeKeys.POST_S3_DATA,
                                        S3UploadTypeKeys.POST_S3_DATA_SUCCESS,
                                        S3UploadTypeKeys.POST_S3_DATA_FAIL],
                                    data: s3Data,
                                    requestPayload: payload,
                                    successPayload: payload,
                                    failurePayload: payload,
                                });
                            }
                        }
                    })
            ).catch(error => {
                console.log(error);
                dispatch({
                    response: {error},
                    type: S3UploadTypeKeys.GET_S3_PHOTO_INFO_FAIL,
                    ...failurePayload
                });
                dispatchOnFailure && dispatch(dispatchOnFailure);
            })
    }
};
