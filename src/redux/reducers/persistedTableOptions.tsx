enum TypeKeys {
    SAVE_TABLE_OPTIONS = 'instacar/persistedTableOptions/SAVE_TABLE_OPTIONS',
}

interface Options {

}

interface SaveTableOptionsAction {
    type: TypeKeys.SAVE_TABLE_OPTIONS,
    options: Options,
    tableId: string
}

type ActionTypes =
    | SaveTableOptionsAction


export interface PersistedTableOptionsState {
    [tableId: string]: Options
}

export default function reducer(state: PersistedTableOptionsState = {}, action: ActionTypes) {
    let {tableId} = action;

    switch (action.type) {
        case TypeKeys.SAVE_TABLE_OPTIONS:
            return {
                ...state,
                [tableId]: {
                    ...action.options
                },
            };
        default:
            return state;
    }
}

export function setPersistentTableOptions(tableId: string, options: Options): SaveTableOptionsAction {
    return {
        type: TypeKeys.SAVE_TABLE_OPTIONS,
        tableId,
        options
    }
}
