import {
    CommonTypeKeys, LoginAction, LoginSuccessFailAction, LogoutAction, SignupAction, SignupSuccessFailAction,
    SocialLoginAction,
    SocialLoginSuccessFailAction
} from './commonActions';

export enum TypeKeys {
    SET_CODE_PUSH_CHECKED = 'react-web-native-sketch/persisted/SET_CODE_PUSH_CHECKED',
    UPDATE_PERSIST = 'react-web-native-sketch/persisted/UPDATE_PERSIST',
    SET_HEADERS = 'react-web-native-sketch/persisted/SET_HEADERS',
    REHYDRATE = 'persist/REHYDRATE'
}

export interface SetCodePushAction {
    type: TypeKeys.SET_CODE_PUSH_CHECKED,
}

export interface UpdatePersistAction {
    type: TypeKeys.UPDATE_PERSIST,
    data: any,
}

export interface SetHeadersAction {
    type: TypeKeys.SET_HEADERS,
    headers: any,
}

export interface RehydrateAction {
    type: TypeKeys.REHYDRATE,
    payload: {
        persisted: any,
    }
}

export type ActionTypes =
    | SetCodePushAction
    | UpdatePersistAction
    | SetHeadersAction
    | RehydrateAction
    | LoginAction
    | LoginSuccessFailAction
    | SignupAction
    | SignupSuccessFailAction
    | SocialLoginAction
    | SocialLoginSuccessFailAction
    | LogoutAction

export interface PersistedState<T> {
    codePush: {
        codePushChecked: boolean
    }
    login?: {
        userData?: any
    }
    headers?: any
    other?: T
}


export const initialState: PersistedState<any> = {
    codePush: {
        codePushChecked: false,
    },
};


export const persisted = ( state: PersistedState<any> = initialState,
                           action: ActionTypes, ): PersistedState<any> => {
    switch (action.type) {
        case CommonTypeKeys.LOGIN_SUCCESS:
        case CommonTypeKeys.SIGNUP_SUCCESS:
            // we'll store userData in persisted so that we only persist persisted
            return {
                ...state,
                login: {
                    userData: action.response,
                }
            };
        case CommonTypeKeys.LOGIN_FAIL:
        case CommonTypeKeys.SIGNUP_FAIL:
        case CommonTypeKeys.LOGOUT:
            return {
                ...state,
                login: {},
            };
        case TypeKeys.REHYDRATE:
            if (action.payload.persisted) {
                // setTheme(action.payload.persisted.params ? action.payload.persisted.params.theme : {});
                // setTranslations(action.payload.persisted.params && action.payload.persisted.params.translations);
            }
            return {
                // !! THE FRESH DATA HAS PRIORITY OVER PERSISTED DATA
                ...(action.payload && action.payload.persisted),
                ...state,
                persistComplete: true,
            };
        case TypeKeys.SET_CODE_PUSH_CHECKED:
            return {
                ...state,
                codePush: {
                    codePushChecked: true
                },
            };
        case TypeKeys.UPDATE_PERSIST:
            return {
                ...state,
                other: {
                    ...(state.other || {}),
                    ...action.data,
                },
            };
        case TypeKeys.SET_HEADERS:
            return {
                ...state,
                headers: action.headers,
            };
        default:
            return state;
    }
};

export const updatePersist = (data: any): UpdatePersistAction => {
    return {
        type: TypeKeys.UPDATE_PERSIST,
        data,
    }
};

export const setCodePushChecked = (): SetCodePushAction => {
    return {
        type: TypeKeys.SET_CODE_PUSH_CHECKED
    }
};

export const setHeaders = (headers: any): SetHeadersAction => {
    return {
        type: TypeKeys.SET_HEADERS,
        headers,
    }
} ;