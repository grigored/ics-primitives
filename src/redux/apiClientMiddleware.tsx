import "whatwg-fetch";
import {showAlert} from "./reducers/navigation";

const encodeParametersInUrl = (url: string, queryParameters: { [key: string]: string }) => {
    if (!queryParameters) {
        return url;
    }
    const encodedParams = Object.keys(queryParameters)
        .filter(key => queryParameters[key] !== null && queryParameters[key] !== undefined)
        .map(key => `${key}=${encodeURIComponent(queryParameters[key])}`)
        .join('&');

    return url + (encodedParams ? `?${encodedParams}` : '');
};

export const apiClientMiddleware = <Dispatch extends Function, GlobalState>(
    baseUrl: string,
    baseHeaders: { [key: string]: string } = {}
) => (
    {dispatch, getState}: { dispatch: Dispatch, getState: () => GlobalState }
) => {
    return (next: any) => (action: any) => {
        const {
            types,
            method,
            url,
            extraHeaders,
            body,
            queryParameters,
            requestPayload = {},
            successPayload = {},
            dispatchOnSuccess,
            failurePayload = {},
            dispatchOnFailure,
            host = undefined,
        } = action;

        if (!types) {
            // Normal action: pass it on
            return next(action)
        }

        if (
            !Array.isArray(types) ||
            types.length !== 3 ||
            !types.every(type => typeof type === 'string')
        ) {
            throw new Error('Expected an array of three string types.')
        }

        const [requestType, successType, failureType] = types;

        dispatch({
            type: requestType,
            ...requestPayload
        });

        // @ts-ignore
        const persistedHeaders = (getState().persisted && getState().persisted.headers) || {};

        let fetchParams = {
            method,
            body: JSON.stringify(body),
            headers: {...baseHeaders, ...persistedHeaders, ...(extraHeaders || {})},
        };

        return fetch((!host ? baseUrl : host) + encodeParametersInUrl(url, queryParameters), fetchParams)
            .then(response =>
                response
                    .json()
                    .then(json => {
                        let status = response.status;


                        if (status >= 200 && status < 300) {
                            dispatch({
                                type: successType,
                                response: json,
                                ...successPayload,
                            });
                            dispatchOnSuccess && dispatch(dispatchOnSuccess);
                            // } else if (status === 401) {
                            // dispatch(logout());
                            // dispatch(push('/login'));
                        } else {
                            dispatch({
                                type: failureType,
                                response: json,
                                ...failurePayload,
                            });
                            dispatchOnFailure && dispatch(dispatchOnFailure);
                            if (json.error) {
                                // let translatedError = _t(json.error, {message: json.message, ...(json.extra_details || {})});
                                // if (translatedError === json.error) {
                                //     // TODO send json.error to bugsnag
                                // }
                                dispatch(showAlert(json.error));
                            } else {
                                dispatch(showAlert("API_ERROR"));
                            }
                        }
                    })
            ).catch(error => {
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
