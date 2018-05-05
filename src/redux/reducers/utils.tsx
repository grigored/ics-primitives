
export function getUserDataLocalStorageName(): string {
    return 'userData';
}

export const encodeParametersInUrl = (url: string, queryParameters: {[key: string]: string}) => {
    if (!queryParameters) {
        return url;
    }
    const encodedParams = Object.keys(queryParameters)
        .filter(key => queryParameters[key] !== null && queryParameters[key] !== undefined)
        .map(key => `${key}=${encodeURIComponent(queryParameters[key])}`)
        .join('&');

    return url + (encodedParams ? `?${encodedParams}`: '');
};
