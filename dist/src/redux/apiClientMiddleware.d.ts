import "whatwg-fetch";
export declare const apiClientMiddleware: <Dispatch extends Function, GlobalState>(baseUrl: string, baseHeaders?: {
    [key: string]: string;
}) => ({dispatch, getState}: {
    dispatch: Dispatch;
    getState: () => GlobalState;
}) => (next: any) => (action: any) => any;
