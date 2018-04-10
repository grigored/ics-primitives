import { FormHelpersState, GlobalState } from '../FormComponents/FormComponents.types';
import { getNestedField, isObject } from '../../utils/common';

export enum TypeKeys {
    DISPLAY_ERRORS = 'instacar/form/DISPLAY_ERRORS',
    SEND_FORM_DATA = 'instacar/form/SEND_FORM_DATA',
    SEND_FORM_DATA_SUCCESS = 'instacar/form/SEND_FORM_DATA_SUCCESS',
    SEND_FORM_DATA_FAIL = 'instacar/form/SEND_FORM_DATA_FAIL',
}

export interface DisplayErrorsAction {
    type: TypeKeys.DISPLAY_ERRORS,
    formName: string, // FORM_NAMES_ENUM,
}

export interface SendFormDataAction {
    type: TypeKeys.SEND_FORM_DATA,
    formName: string,
}

export interface SendFormDataSuccessAction {
    type: TypeKeys.SEND_FORM_DATA_SUCCESS,
    formName: string,
    response: any,
}

export interface SendFormDataFailAction {
    type: TypeKeys.SEND_FORM_DATA_FAIL,
    formName: string,
}

type ActionTypes =
    | DisplayErrorsAction
    | SendFormDataAction
    | SendFormDataSuccessAction
    | SendFormDataFailAction


export const formHelpers = ( state: FormHelpersState = {}, action: ActionTypes ): FormHelpersState => {
    switch (action.type) {
        case TypeKeys.DISPLAY_ERRORS:
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    showErrors: true,
                }
            };
        case TypeKeys.SEND_FORM_DATA:
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    response: null,
                    sendingForm: true,
                    sendFormSuccess: false,
                },
            };
        case TypeKeys.SEND_FORM_DATA_SUCCESS:
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    response: action.response,
                    sendingForm: false,
                    sendFormSuccess: true
                },
            };
        case TypeKeys.SEND_FORM_DATA_FAIL:
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    sendingForm: false,
                    sendFormSuccess: false,
                },
            };

        default:
            return state;
    }
};


export const displayErrors = ( formName: string, // FORM_NAMES_ENUM
): DisplayErrorsAction => ({
    type: TypeKeys.DISPLAY_ERRORS,
    formName,
});

const hasErrors = ( formFields: Array<any> | null ) => {
    if (!formFields) {
        return false;
    }
    for (let index in formFields) {
        const field = formFields[index];
        if (isObject(field)) {
            if (hasErrors(field)) {
                return true;
            }
        }
        else if (!!field) {
            return true;
        }
    }
    return false;
};


export const sendFormData = ( formName: string, // FORM_NAMES_ENUM,
                              url: string,
                              method: string,
                              forceSend = false,
                              types?: [string, string, string] ) => {
    return ( dispatch: any, getState: () => GlobalState ) => {
        let formData: any = getState().form[formName];
        if (formData && formData.sendingForm) {
            console.log('already sending form');
            return
        }
        let formFields = (formData && formData.values) || {};
        if (formHasErrors(formData)) {
            dispatch(displayErrors(formName));
            return;
        }
        if (Object.keys(formFields).length !== 0 || forceSend === true) {
            dispatch({
                types: types || [
                    TypeKeys.SEND_FORM_DATA,
                    TypeKeys.SEND_FORM_DATA_SUCCESS,
                    TypeKeys.SEND_FORM_DATA_FAIL
                ],
                body: method !== 'get' ? formFields : null,
                queryParameters: method === 'get' ? formFields : null,
                method: method,
                url: url,
                extraData: {formName}
            })
        }
    }
};

export const formHasErrors = (formData: any): boolean => {
    let errors = !!formData.syncErrors
            ? Object.keys(formData.syncErrors!)
                .filter(field => !!getNestedField(formData, ['syncErrors', field]))
                .map(field => formData.syncErrors[field])
            :
            null;
    if (hasErrors(errors) || formData.formError) {
        return true;
    }
    return false;
};