"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
var encodeParametersInUrl = function (url, queryParameters) {
    if (!queryParameters) {
        return url;
    }
    var encodedParams = Object.keys(queryParameters)
        .filter(function (key) { return queryParameters[key] !== null && queryParameters[key] !== undefined; })
        .map(function (key) { return key + "=" + encodeURIComponent(queryParameters[key]); })
        .join('&');
    return url + (encodedParams ? "?" + encodedParams : '');
};
exports.apiClientMiddleware = function (baseUrl, baseHeaders) {
    if (baseHeaders === void 0) { baseHeaders = {}; }
    return function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) { return function (action) {
            var types = action.types, method = action.method, url = action.url, body = action.body, queryParameters = action.queryParameters, _a = action.requestPayload, requestPayload = _a === void 0 ? {} : _a, _b = action.successPayload, successPayload = _b === void 0 ? {} : _b, dispatchOnSuccess = action.dispatchOnSuccess, _c = action.failurePayload, failurePayload = _c === void 0 ? {} : _c, dispatchOnFailure = action.dispatchOnFailure;
            if (!types) {
                // Normal action: pass it on
                return next(action);
            }
            if (!Array.isArray(types) ||
                types.length !== 3 ||
                !types.every(function (type) { return typeof type === 'string'; })) {
                throw new Error('Expected an array of three string types.');
            }
            var requestType = types[0], successType = types[1], failureType = types[2];
            dispatch(__assign({ type: requestType }, requestPayload));
            var fetchParams = {
                method: method,
                body: JSON.stringify(body),
                headers: baseHeaders,
            };
            return fetch(baseUrl + encodeParametersInUrl(url, queryParameters), fetchParams)
                .then(function (response) {
                return response
                    .json()
                    .then(function (json) {
                    var status = response.status;
                    if (status >= 200 && status < 300) {
                        dispatch(__assign({ type: successType, response: json }, successPayload));
                        dispatchOnSuccess && dispatch(dispatchOnSuccess);
                    }
                    else if (status === 401) {
                        // dispatch(logout());
                        // dispatch(push('/login'));
                    }
                    else {
                        dispatch(__assign({ type: failureType, response: json }, failurePayload));
                        dispatchOnFailure && dispatch(dispatchOnFailure);
                    }
                    // if (json.error) {
                    //     let translatedError = _t(json.error, {message: json.message, ...(json.extra_details || {})});
                    //     if (translatedError === json.error) {
                    //         // TODO send json.error to bugsnag
                    //     }
                    //     dispatch(showAlert("RootWorker", DIALOG_IDS.API_ERROR, translatedError));
                    // }
                    // dispatch(showAlert("RootWorker", DIALOG_IDS.API_ERROR, url));
                });
            }).catch(function (error) {
                console.log(error);
                dispatch(__assign({ type: failureType, response: { error: error } }, failurePayload));
                dispatchOnFailure && dispatch(dispatchOnFailure);
            });
        }; };
    };
};
//# sourceMappingURL=apiClientMiddleware.js.map