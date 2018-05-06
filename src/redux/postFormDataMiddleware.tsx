import 'whatwg-fetch';
import { showAlert } from './reducers/navigation';


export const postFormDataMiddleware = <Dispatch extends Function, GlobalState>(
    baseUrl: string,
    baseHeaders: {[key: string]: string} = {}
) => (
    {dispatch, getState}: {dispatch: Dispatch, getState: () => GlobalState}
) => {
    return (next: any ) => (action: any) => {
        const {
            formTypes,
            payload = {},
            data = {},
            requestPayload = {},
            successPayload = {},
            dispatchOnSuccess,
            failurePayload = {},
            dispatchOnFailure,
        } = action;

        if (!formTypes) {
            // Normal action: pass it on
            return next(action)
        }

        if (
            !Array.isArray(formTypes) ||
            formTypes.length !== 3 || !formTypes.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.')
        }

        const [requestType, successType, failureType] = formTypes;

        dispatch(Object.assign({}, payload, {
            type: requestType,
            ...requestPayload
        }));

        let headers = {};

        const formData = new FormData();
        for (let name in data) {
            formData.append(name, data[name]);
        }

        let fetchParams = {
            // mode: 'no-cors',
            method: 'POST',
            headers: headers,
            body: formData,
        };
        return fetch(baseUrl, fetchParams)
            .then(function (response) {


                    let actionType = failureType,
                        payload = failurePayload;
                    if (response.status >= 200 && response.status < 300) {
                        actionType = successType;
                        payload = successPayload;
                        dispatchOnSuccess && dispatch(dispatchOnSuccess);
                    }
                    else {
                        dispatch(showAlert('API_ERROR'));
                        dispatchOnFailure && dispatch(dispatchOnFailure);
                    }

                    const responseData = {
                        error: actionType !== successType ? 'FAILED_TO_UPLOAD_S3' : '',
                        // formName: formName,
                        // fieldName: fieldName,
                        // url: AWS_S3 + data['key'],
                        url: data['key'],
                    };

                    dispatch(Object.assign({}, payload, {
                        response: responseData,
                        type: actionType,
                        ...payload
                    }));
                }
            ).catch(error => {
                // TODO add bugsnag here
                console.log('error');
                console.log(error);
                dispatch({
                    type: failureType,
                    response: {error},
                    ...failurePayload,
                });
                dispatchOnFailure && dispatch(dispatchOnFailure);

            })

    }
};