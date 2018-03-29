import { ACTION_SHEETS_IDS } from "../../utils/enums";

export enum TypeKeys {
    SHOW_ACTION_SHEET = 'instacar/dialog/SHOW_ACTION_SHEET',
}

export interface ShowActionSheetAction {
    type: TypeKeys.SHOW_ACTION_SHEET,
    sheetId?: ACTION_SHEETS_IDS,
    show?: boolean,
}

export interface DialogState {
    sheetId?: ACTION_SHEETS_IDS,
    sheetVisible?: boolean,
}

export type ActionTypes =
    | ShowActionSheetAction


export const dialog = (state: DialogState = {}, action: ActionTypes) => {
    switch (action.type) {
        case TypeKeys.SHOW_ACTION_SHEET:
            return {
                ...state,
                sheetId: action.sheetId,
                sheetVisible: action.show,
            };
        default:
            return state;
    }

}

export function showActionSheet(sheetId?: ACTION_SHEETS_IDS, show?: boolean): ShowActionSheetAction {
    return {
        type: TypeKeys.SHOW_ACTION_SHEET,
        sheetId,
        show,
    }
}
