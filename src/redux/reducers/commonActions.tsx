
export enum CommonTypeKeys {
    SOCIAL_LOGIN = 'react-web-native-sketch/auth/SOCIAL_LOGIN',
    SOCIAL_LOGIN_SUCCESS = 'react-web-native-sketch/auth/SOCIAL_LOGIN_SUCCESS',
    SOCIAL_LOGIN_FAIL = 'react-web-native-sketch/auth/SOCIAL_LOGIN_FAIL',
    LOGIN = 'react-web-native-sketch/auth/LOGIN',
    LOGIN_SUCCESS = 'react-web-native-sketch/auth/LOGIN_SUCCESS',
    LOGIN_FAIL = 'react-web-native-sketch/auth/LOGIN_FAIL',
    SIGNUP = 'react-web-native-sketch/auth/SIGNUP',
    SIGNUP_SUCCESS = 'react-web-native-sketch/auth/SIGNUP_SUCCESS',
    SIGNUP_FAIL = 'react-web-native-sketch/auth/SIGNUP_FAIL',
    LOGOUT = 'react-web-native-sketch/auth/LOGOUT',
    LOGOUT_SUCCESS = 'react-web-native-sketch/auth/LOGOUT_SUCCESS',
    LOGOUT_FAIL = 'react-web-native-sketch/auth/LOGOUT_FAIL',
    VALIDATE_2FA = 'react-web-native-sketch/auth/VALIDATE_2FA',
    VALIDATE_2FA_SUCCESS = 'react-web-native-sketch/auth/VALIDATE_2FA_SUCCESS',
    VALIDATE_2FA_FAIL = 'react-web-native-sketch/auth/VALIDATE_2FA_FAIL',
}

export interface LoginAction {
    type: CommonTypeKeys.LOGIN,
}

export interface LoginSuccessFailAction {
    type: CommonTypeKeys.LOGIN_SUCCESS | CommonTypeKeys.LOGIN_FAIL,
    response: any,
}

export interface SignupAction {
    type: CommonTypeKeys.SIGNUP,
}

export interface SignupSuccessFailAction {
    type: CommonTypeKeys.SIGNUP_SUCCESS | CommonTypeKeys.SIGNUP_FAIL,
    response: any,
}

export interface SocialLoginAction {
    type: CommonTypeKeys.SOCIAL_LOGIN,
}

export interface SocialLoginSuccessFailAction {
    type: CommonTypeKeys.SOCIAL_LOGIN_SUCCESS | CommonTypeKeys.SOCIAL_LOGIN_FAIL,
    response: any,
}

export interface LogoutAction {
    type: CommonTypeKeys.LOGOUT,
}

export interface LogoutSuccessFailAction {
    type: CommonTypeKeys.LOGOUT_SUCCESS | CommonTypeKeys.LOGOUT_FAIL,
    response: any,
}

export interface Validate2FAAction {
    type: CommonTypeKeys.VALIDATE_2FA,
}

export interface Validate2FASuccessFailAction {
    type: CommonTypeKeys.VALIDATE_2FA_SUCCESS | CommonTypeKeys.VALIDATE_2FA_FAIL,
    response: any,
}
