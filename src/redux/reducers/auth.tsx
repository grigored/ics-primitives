import { googleSignOut } from '../../nativeComponents/ButtonGoogleComponent/googleLoginUtils';
import { isWeb } from '../../primitives/platform/platform';
import {
    CommonTypeKeys, LoginAction, LoginSuccessFailAction, LogoutAction, LogoutSuccessFailAction, SignupAction,
    SignupSuccessFailAction, SocialLoginAction, SocialLoginSuccessFailAction, Validate2FAAction,
    Validate2FASuccessFailAction
} from './commonActions';
import { getUserDataLocalStorageName } from './utils';

export enum TypeKeys {
    FB_LOAD_SDK = 'react-web-native-sketch/auth/FB_LOAD_SDK',
    FB_SDK_LOADED = 'react-web-native-sketch/auth/FB_SDK_LOADED',
    FB_STATUS_CHANGE = 'react-web-native-sketch/auth/FB_STATUS_CHANGE',
    GOOGLE_LOAD_SDK = 'react-web-native-sketch/auth/GOOGLE_LOAD_SDK',
    GOOGLE_SDK_LOADED = 'react-web-native-sketch/auth/GOOGLE_SDK_LOADED',
}


export interface FbLoadSdkAction {
    type: TypeKeys.FB_LOAD_SDK,
}

export interface FbSdkLoadedAction {
    type: TypeKeys.FB_SDK_LOADED,
}

export interface FbStatusChangeAction {
    type: TypeKeys.FB_STATUS_CHANGE,
}

export interface GoogleLoadSdkAction {
    type: TypeKeys.GOOGLE_LOAD_SDK,
}

export interface GoogleSdkLoadedAction {
    type: TypeKeys.GOOGLE_SDK_LOADED,
}

export type ActionTypes =
    | FbSdkLoadedAction
    | FbLoadSdkAction
    | FbStatusChangeAction
    | GoogleLoadSdkAction
    | GoogleSdkLoadedAction
    | LoginAction
    | LoginSuccessFailAction
    | SignupAction
    | SignupSuccessFailAction
    | SocialLoginAction
    | SocialLoginSuccessFailAction
    | LogoutAction
    | LogoutSuccessFailAction
    | Validate2FAAction
    | Validate2FASuccessFailAction

export interface AuthState {
    forgotSuccess?: boolean,
    googleSdkIsLoaded: boolean
    loadedFbSdk: boolean,
    loadingFbSdk: boolean,
    loadingForgot: boolean,
    loadingGoogleSdk: boolean,
    loggingIn: boolean,
    loggingOut: boolean,
    signingUp: boolean,
    validateError?: string
    validateSuccess: boolean
    validating: boolean,
}

const initialState: AuthState = {
    forgotSuccess: undefined,
    googleSdkIsLoaded: false,
    loadedFbSdk: false,
    loadingFbSdk: false,
    loadingForgot: false,
    loadingGoogleSdk: false,
    loggingIn: false,
    loggingOut: false,
    signingUp: false,
    validateSuccess: false,
    validating: false,
};

export const auth = ( state: AuthState = initialState, action: ActionTypes ): AuthState => {
    switch (action.type) {
        case TypeKeys.FB_LOAD_SDK:
            return {
                ...state,
                loadingFbSdk: true
            };
        case TypeKeys.FB_SDK_LOADED:
            return {
                ...state,
                loadingFbSdk: false,
                loadedFbSdk: true
            };
        case TypeKeys.FB_STATUS_CHANGE:
            return {
                ...state
            };
        case CommonTypeKeys.SOCIAL_LOGIN:
        case CommonTypeKeys.LOGIN:
            return {
                ...state,
                loggingIn: true
            };
        case CommonTypeKeys.SOCIAL_LOGIN_SUCCESS:
        case CommonTypeKeys.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
            };
        case CommonTypeKeys.LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
            };
        case CommonTypeKeys.SOCIAL_LOGIN_FAIL:

            // fbSignOut();
            googleSignOut();
            return {
                ...state,
                loggingIn: false
            };

        case CommonTypeKeys.SIGNUP:
            return {
                ...state,
                signingUp: true
            };
        case CommonTypeKeys.SIGNUP_SUCCESS:
            return {
                ...state,
                signingUp: false,
            };
        case CommonTypeKeys.SIGNUP_FAIL:
            return {
                ...state,
                signingUp: false,
            };

        case CommonTypeKeys.VALIDATE_2FA:
            return {
                ...state,
                validating: true,
                validateSuccess: false,
            };
        case CommonTypeKeys.VALIDATE_2FA_SUCCESS:
            return {
                ...state,
                validating: false,
                validateSuccess: true,
            };
        case CommonTypeKeys.VALIDATE_2FA_FAIL:
            return {
                ...state,
                validating: false,
                validateSuccess: false,
            };

        case CommonTypeKeys.LOGOUT:
            return {
                ...state,
                loggingOut: true
            };
        case CommonTypeKeys.LOGOUT_SUCCESS:
            if (isWeb) {
                localStorage.removeItem( getUserDataLocalStorageName() );
                document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            googleSignOut();
            // fbSignOut();
            return {
                ...state,
                loggingOut: false,
            };
        case CommonTypeKeys.LOGOUT_FAIL:
            return {
                ...state,
                loggingOut: false,
            };

        case TypeKeys.GOOGLE_LOAD_SDK:
            return {
                ...state,
                loadingGoogleSdk: true,
                googleSdkIsLoaded: false,
            };
        case TypeKeys.GOOGLE_SDK_LOADED:
            return {
                ...state,
                loadingGoogleSdk: false,
                googleSdkIsLoaded: true,
            };
        default:
            return state;
    }
};

export function fbSdkLoaded(): FbSdkLoadedAction {
    return {
        type: TypeKeys.FB_SDK_LOADED
    }
}

export function fbStatusChangeCallback( inviteCode: string,
                                        response: {
                                            status: string,
                                            authResponse: {
                                                userID: string,
                                                accessToken: string
                                            }
                                        } ): any {
    if (response.status === 'connected') {
        let authResponse = response.authResponse;
        return {
            types: [CommonTypeKeys.SOCIAL_LOGIN, CommonTypeKeys.SOCIAL_LOGIN_SUCCESS, CommonTypeKeys.SOCIAL_LOGIN_FAIL],
            method: 'post',
            url: 'oauth-login',
            body: {
                providerUserId: authResponse.userID,
                oauthToken: authResponse.accessToken,
                providerName: 'facebook',
                invite_code: inviteCode,
                redirect_uri: null
            },
        }
    } else if (response.status === 'not_authorized') {
        console.log( 'Please log into this app.' );
    } else {
        console.log( 'Please log into Facebook.' );
    }
    return {
        type: TypeKeys.FB_STATUS_CHANGE
    };
}

declare var FB: any;

export const fbLoadSdk = ( appId: string,
                           fbSdkLoaded: () => void,
                           fbStatusChangeCallback: any,
                           inviteCode?: string, ): FbLoadSdkAction => {

    window.fbAsyncInit = function () {
        FB.init( {
            appId: appId,
            cookie: false,
            xfbml: true,
            version: 'v2.5'
        } );

        FB.Event.subscribe( 'auth.statusChange', fbStatusChangeCallback.bind( null, inviteCode ) );

        fbSdkLoaded();
    };

    // Load the SDK asynchronously
    ( function ( d, s, id ) {
        let js: any, fjs: any = d.getElementsByTagName( s )[0];
        if (d.getElementById( id )) return;
        js = d.createElement( s );
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore( js, fjs );
    }( document, 'script', 'facebook-jssdk' ) );

    return {
        type: TypeKeys.FB_LOAD_SDK
    }
};

export const loadGoogleSdk = () => {
    return {
        type: TypeKeys.GOOGLE_LOAD_SDK,
    };
};

export const loadedGoogleSdk = () => {
    return {
        type: TypeKeys.GOOGLE_SDK_LOADED,
    };
};

export const login = ( body: any, url: string, method: string ) => {
    return {
        types: [CommonTypeKeys.LOGIN, CommonTypeKeys.LOGIN_SUCCESS, CommonTypeKeys.LOGIN_FAIL],
        method,
        url,
        body,
    }
};

export const socialLogin = ( url: string,
                             method: string,
                             providerName: string,
                             oauthToken: string | null,
                             providerUserId: string | null,
                             invite_code: string | null,
                             redirect_uri: string | null ) => {
    return {
        types: [CommonTypeKeys.SOCIAL_LOGIN, CommonTypeKeys.SOCIAL_LOGIN_SUCCESS, CommonTypeKeys.SOCIAL_LOGIN_FAIL],
        method,
        url,
        body: { providerName, oauthToken, providerUserId, invite_code, redirect_uri: redirect_uri },
    }
};

export const signup = ( body: any, url: string, method: string ) => {
    return {
        types: [CommonTypeKeys.SIGNUP, CommonTypeKeys.SIGNUP_SUCCESS, CommonTypeKeys.SIGNUP_FAIL],
        method,
        url,
        body,
    }
};

export const validate2FA = ( body: any, url: string, method: string, types?: Array<string> ) => {
    return {
        types: types && types.length == 3
            ? types
            : [CommonTypeKeys.VALIDATE_2FA, CommonTypeKeys.VALIDATE_2FA_SUCCESS, CommonTypeKeys.VALIDATE_2FA_FAIL],
        method,
        url,
        body,
    }
};

export const logout = ( body: any, url: string, method: string ) => {
    return {
        types: [CommonTypeKeys.LOGOUT, CommonTypeKeys.LOGOUT_SUCCESS, CommonTypeKeys.LOGOUT_FAIL],
        url,
        method,
        body,
    }
};

export interface LogoutProps {
    types: Array<string>,
    url: string,
    method: string,
    body: any,
}

export const logoutLocal = ( props?: LogoutProps ) => {
    if (isWeb) {
        localStorage.removeItem( getUserDataLocalStorageName() );
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    googleSignOut();
    // fbSignOut();
    return !!props
        ? props
        : { type: CommonTypeKeys.LOGOUT }
};
