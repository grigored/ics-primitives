
export enum TypeKeys {
    GET_TABLE_DATA = 'instacar/table/GET_TABLE_DATA',
    GET_TABLE_DATA_SUCCESS = 'instacar/table/GET_TABLE_DATA_SUCCESS',
    GET_TABLE_DATA_FAIL = 'instacar/table/GET_TABLE_DATA_FAIL',

    DELETE_TABLE_ENTRY = 'instacar/table/DELETE_TABLE_ENTRY',
    DELETE_TABLE_ENTRY_SUCCESS = 'instacar/table/DELETE_TABLE_ENTRY_SUCCESS',
    DELETE_TABLE_ENTRY_FAIL = 'instacar/table/DELETE_TABLE_ENTRY_FAIL',

    REFRESH_TABLE = 'instacar/table/REFRESH_TABLE',
    SHOW_ENTRY_DETAILS = 'instacar/table/SHOW_ENTRY_DETAILS',
    INIT_ENTRY_DETAILS = 'instacar/table/INIT_ENTRY_DETAILS',

    SHOW_MENU = 'instacar/table/SHOW_MENU',
    CLEAR_TABLE_DATA = 'instacar/table/CLEAR_TABLE_DATA',

    CHANGE_GPS_DATA_VIEW_MODE = 'instacar/table/CHANGE_GPS_DATA_VIEW_MODE',
}

export interface GetTableDataAction {
    type: TypeKeys.GET_TABLE_DATA,
    tableId: string,
}

export interface GetTableDataSuccessFailAction {
    type: TypeKeys.GET_TABLE_DATA_SUCCESS | TypeKeys.GET_TABLE_DATA_FAIL,
    response: any,
    tableId: string,
}

export interface DeleteTableEntryAction {
    type: TypeKeys.DELETE_TABLE_ENTRY,
    tableId: string,
    itemId: string | number,
}

export interface DeleteTableEntrySuccessFailAction {
    type: TypeKeys.DELETE_TABLE_ENTRY_SUCCESS | TypeKeys.DELETE_TABLE_ENTRY_FAIL,
    response: any,
    tableId: string,
}

export interface RefreshTableAction {
    type: TypeKeys.REFRESH_TABLE,
    tableId: string,
}

export interface ShowMenuAction {
    type: TypeKeys.SHOW_MENU,
    menuRow: any,
    menuShown: boolean,
    tableId: string,
}

export interface ClearTableDataAction {
    type: TypeKeys.CLEAR_TABLE_DATA,
    tableId: string,
}

export interface ChangeGpsDataViewMode {
    type: TypeKeys.CHANGE_GPS_DATA_VIEW_MODE,
    isTableView: boolean,
}

export interface ShowEntryDetails {
    type: TypeKeys.SHOW_ENTRY_DETAILS,
    details?: Array<TableEntryDetail>,
    itemName?: string | number,
}

export interface InitEntryDetails {
    type: TypeKeys.INIT_ENTRY_DETAILS,
    componentName: string,
}

export type ActionTypes =
    | GetTableDataAction
    | GetTableDataSuccessFailAction
    | DeleteTableEntryAction
    | DeleteTableEntrySuccessFailAction
    | RefreshTableAction
    | ShowMenuAction
    | ClearTableDataAction
    | ChangeGpsDataViewMode
    | ShowEntryDetails
    | InitEntryDetails

export interface TableState {
    [tableId: string]: {
        loading?: boolean,
        refresh?: boolean,
        data?: any,
        menuShown?: boolean,
        menuRow?: any,
        deletingEntry?: boolean,
        deletedEntrySuccess?: boolean,
        isTableView?: boolean,

        details?: Array<TableEntryDetail>,
        itemName?: string | number,
        componentName?: string,
    }
}

export interface TableEntryDetail {
    title: string,
    value: string | number | undefined | null | JSX.Element,
}

const initialState = {};

export const table = (state: TableState = initialState, action: ActionTypes): TableState => {
    switch (action.type) {
        case TypeKeys.GET_TABLE_DATA:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    loading: true,
                    refresh: false,
                }
            };
        case TypeKeys.GET_TABLE_DATA_SUCCESS:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    loading: false,
                    data: action.response,
                }
            };
        case TypeKeys.GET_TABLE_DATA_FAIL:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    loading: false,
                }
            };


        case TypeKeys.DELETE_TABLE_ENTRY:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    deletingEntry: true,
                    deletedEntrySuccess: false,
                }
            };
        case TypeKeys.DELETE_TABLE_ENTRY_SUCCESS:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    deletingEntry: false,
                    deletedEntrySuccess: true,
                }
            };
        case TypeKeys.DELETE_TABLE_ENTRY_FAIL:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    deletingEntry: false,
                    deletedEntrySuccess: false,
                }
            };

        case TypeKeys.SHOW_MENU:
            return {
                ...state,
                [action.tableId]: {
                    ...state[action.tableId],
                    menuShown: action.menuShown,
                    menuRow: action.menuRow,
                }
            };

        case TypeKeys.REFRESH_TABLE:
            return {
                ...state,
                [action.tableId]: {
                    ...(state[action.tableId] || {}),
                    refresh: true,
                }
            };

        case TypeKeys.CLEAR_TABLE_DATA:
            delete state[action.tableId];
            return {
                ...state
            };

        default:
            return state;
    }
}

export function loadTableData(url: string, tableId: string) {
    return {
        types: [TypeKeys.GET_TABLE_DATA, TypeKeys.GET_TABLE_DATA_SUCCESS, TypeKeys.GET_TABLE_DATA_FAIL],
        method: 'get',
        url,
        extraData: {
            tableId
        }
    }
}

export function deleteTableEntry(url: string, itemId: string | number, tableId: string) {
    return {
        types: [TypeKeys.DELETE_TABLE_ENTRY, TypeKeys.DELETE_TABLE_ENTRY_SUCCESS, TypeKeys.DELETE_TABLE_ENTRY_FAIL],
        method: 'delete',
        url: `${url}/${itemId}`,
        extraData: {
            tableId
        }
    }
}

export function showMenu(pageId: string, tableId: string, menuShown: boolean, menuRow: any) {
    return {
        type: TypeKeys.SHOW_MENU,
        pageId,
        tableId,
        menuShown,
        menuRow,
    }
}

export function setRefreshTable(tableId: string) {
    return {
        type: TypeKeys.REFRESH_TABLE,
        tableId,
    }
}

export function clearTableData(tableId: string) {
    return {
        type: TypeKeys.CLEAR_TABLE_DATA,
        tableId,
    }
}

export function changeGpsDataViewMode(isTableView: boolean) {
    return {
        type: TypeKeys.CHANGE_GPS_DATA_VIEW_MODE,
        isTableView,
    }
}

export function showEntryDetails(details?: Array<TableEntryDetail>, itemName?: string | number): ShowEntryDetails {
    return {
        type: TypeKeys.SHOW_ENTRY_DETAILS,
        details,
        itemName,
    }
}

export function initEntryDetails(componentName: string): InitEntryDetails {
    return {
        type: TypeKeys.INIT_ENTRY_DETAILS,
        componentName,
    }
}
