import { isWeb } from "../../primitives/platform/platform";

export enum TypeKeys {
    TOGGLE_DRAWER = 'instacar/navigation/TOGGLE_DRAWER',
    POP_PAGE = 'instacar/navigation/POP',
    WEB_ROUTE_CHANGED = 'instacar/navigation/WEB_ROUTE_CHANGED',
    SHOW_DIALOG = 'instacar/navigation/SHOW_DIALOG',
    HIDE_DIALOG = 'instacar/navigation/HIDE_DIALOG',
    PUSH_SCREEN = 'instacar/navigation/PUSH_SCREEN',
}

export enum PushTypes {
    MODAL,
    MODAL_FULL_SCREEN,
    CARD,
}

export interface RouteDefintion {
    screen: string,
    container: React.ComponentClass,
    pushType?: PushTypes,
    title: string,
}

export interface Navigation {
    navigation: any,
}

export interface History {
    history: any,
}

export interface ToggleDrawerAction {
    type: TypeKeys.TOGGLE_DRAWER,
    drawerOpen?: boolean,
}

export interface PopPageAction {
    type: TypeKeys.POP_PAGE,
}

export interface WebRouteChangedAction {
    type: TypeKeys.WEB_ROUTE_CHANGED,
    screen: string,
}

export interface PushScreenAction {
    type: TypeKeys.PUSH_SCREEN,
    screen: string,
    props: any,
}

export interface ShowDialogAction {
    type: TypeKeys.SHOW_DIALOG,
    dialogId: string,
    fullScreen: boolean,
    props: any,
}

export interface HideDialogAction {
    type: TypeKeys.HIDE_DIALOG,
    dialogId: string,
    props: any,
}

export type ActionTypes =
    | ToggleDrawerAction
    | PopPageAction
    | WebRouteChangedAction
    | PushScreenAction
    | ShowDialogAction
    | HideDialogAction

export interface DialogData {
    dialogId: string,
    visible: boolean,
    fullScreen: boolean,
    props: any,
}

export interface NavigationState {
    screen: string,
    drawerOpen: boolean,
    screenProps?: any,
    props: any,
    dialogs: Array<DialogData>,
}

const initialState = {
    screen: isWeb ? location.pathname.substring(1): '',
    drawerOpen: false,
    props: null,
    dialogs: []
};

export const navigation = function(state: NavigationState = initialState, action: ActionTypes): NavigationState {
    switch (action.type) {
        case TypeKeys.TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: (
                    action.drawerOpen !== null && action.drawerOpen !== undefined
                        ? action.drawerOpen
                        : !state.drawerOpen
                ),
            };
        case TypeKeys.PUSH_SCREEN:
            return {
                ...state,
                screen: action.screen,
                props: action.props,
            };
        case TypeKeys.SHOW_DIALOG:
            return {
                ...state,
                dialogs: [
                    ...state.dialogs,
                    {
                        dialogId: action.dialogId,
                        visible: true,
                        fullScreen: action.fullScreen,
                        props: action.props,
                    },
                ]
            };
        case TypeKeys.HIDE_DIALOG:
            return {
                ...state,
                dialogs: hideDialogFromList(state.dialogs, action.dialogId),

            };
        default:
            return state;
    }
};

export const toggleDrawer = (navigation: any, drawerOpen?: boolean) => {
    if (!isWeb) {
        navigation.navigate(drawerOpen ? 'DrawerOpen': 'DrawerClose');
    }
    return {
        type: TypeKeys.TOGGLE_DRAWER,
        drawerOpen,
    }
};


export const pushScreen = (
    navigation: any,
    history: any,
    routeDefinition: RouteDefintion,
    props: any | null,
) => {
    const {screen, pushType, title} = routeDefinition;
    if (isWeb) {
        switch (pushType) {
            case PushTypes.MODAL:
                return {
                    type: TypeKeys.SHOW_DIALOG,
                    dialogId: screen,
                    fullScreen: false,
                    props,
                };
            case PushTypes.MODAL_FULL_SCREEN:
                return {
                    type: TypeKeys.SHOW_DIALOG,
                    dialogId: screen,
                    fullScreen: true,
                    props,
                };
            default:
                history.push('/' + screen);
                return {
                    type: TypeKeys.PUSH_SCREEN,
                    screen,
                    props,
                }
        }
    } else {
        navigation.navigate(title, props);
        return {
            type: TypeKeys.PUSH_SCREEN,
            screen,
            props,
        }
    }
};


export function hideDialog(dialogId: string) {
    // if dialogIndex is null, clear all dialogs
    return {
        type: TypeKeys.HIDE_DIALOG,
        dialogId,
    }
}


function hideDialogFromList(dialogs: Array<any>, dialogId: string) {

    let found = false, newDialogs = [];
    const reversedDialogs = [...dialogs].reverse();
    for (let dialog of reversedDialogs) {
        if (!found && dialog.dialogId === dialogId) {
            found = true;
            newDialogs.push({
                ...dialog,
                visible: false,
            })
        }
        else {
            newDialogs.push(dialog);
        }
    }
    return newDialogs.reverse();
}
