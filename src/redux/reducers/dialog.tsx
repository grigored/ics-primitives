import { ACTION_SHEETS_IDS } from "../../utils/enums";

export enum TypeKeys {
    SHOW_ACTION_SHEET = 'instacar/dialog/SHOW_ACTION_SHEET',
    ADD_SNACKBAR = 'instacar/dialog/ADD_SNACKBAR',
    REMOVE_SNACKBAR = 'instacar/dialog/REMOVE_SNACKBAR',
    REMOVE_FIRST_SNACKBAR = 'instacar/dialog/REMOVE_FIRST_SNACKBAR',
    HIDE_SNACKBAR = 'instacar/dialog/HIDE_SNACKBAR',
}

export interface ShowActionSheetAction {
    type: TypeKeys.SHOW_ACTION_SHEET,
    sheetId?: ACTION_SHEETS_IDS,
    show?: boolean,
}

export interface AddSnackbarAction {
    type: TypeKeys.ADD_SNACKBAR,
    message: string,
}

export interface RemoveSnackbarAction {
    type: TypeKeys.REMOVE_SNACKBAR,
    id: number,
}

export interface HideSnackbarAction {
    type: TypeKeys.HIDE_SNACKBAR,
    id: number,
}

export interface RemoveFirstSnackbarAction {
    type: TypeKeys.REMOVE_FIRST_SNACKBAR,
}

export interface Snack {
    message: string,
    id: number,
    open: boolean,
}

export interface DialogState {
    sheetId?: ACTION_SHEETS_IDS,
    sheetVisible?: boolean,
    snackbarMessages: Array<Snack>,
}

export type ActionTypes =
    | ShowActionSheetAction
    | AddSnackbarAction
    | RemoveSnackbarAction
    | RemoveFirstSnackbarAction
    | HideSnackbarAction

let currentId = 0;

export const dialog = (state: DialogState = {snackbarMessages: []}, action: ActionTypes) => {
    switch (action.type) {
        case TypeKeys.SHOW_ACTION_SHEET:
            return {
                ...state,
                sheetId: action.sheetId,
                sheetVisible: action.show,
            };
        case TypeKeys.ADD_SNACKBAR:
            return {
                ...state,
                snackbarMessages: [
                    ...state.snackbarMessages.map(snack => ({...snack, open: false})),
                    {
                        message: action.message,
                        id: currentId++,
                        open: true,
                    },
                ],
            };
        case TypeKeys.REMOVE_SNACKBAR:
            return {
                ...state,
                snackbarMessages: state.snackbarMessages.filter(snack => snack.id !== action.id),
            };
        case TypeKeys.HIDE_SNACKBAR:
            return {
                ...state,
                snackbarMessages: state.snackbarMessages.map(snack => ({
                    ...snack,
                    open: snack.id === action.id ? false : snack.open
                })),
            };
        case TypeKeys.REMOVE_FIRST_SNACKBAR:
            return {
                ...state,
                snackbarMessages: state.snackbarMessages.slice(1),
            };
        default:
            return state;
    }

};

export function showActionSheet(sheetId?: ACTION_SHEETS_IDS, show?: boolean): ShowActionSheetAction {
    return {
        type: TypeKeys.SHOW_ACTION_SHEET,
        sheetId,
        show,
    }
}

export const addSnackbar = (message: string): AddSnackbarAction => {
    return {
        type: TypeKeys.ADD_SNACKBAR,
        message,
    }
};

export const removeSnackbar = (id: number): RemoveSnackbarAction => {
    return {
        type: TypeKeys.REMOVE_SNACKBAR,
        id,
    }
};

export const hideSnackbar = (id: number): HideSnackbarAction => {
    return {
        type: TypeKeys.HIDE_SNACKBAR,
        id,
    }
};
