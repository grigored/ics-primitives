import * as React from 'react';
import { isWeb } from "../../primitives/platform/platform";

export const DEFAULT_ALERT_ID = 'DEFAULT_ALERT_ID';

export enum TypeKeys {
    TOGGLE_DRAWER = 'instacar/navigation/TOGGLE_DRAWER',
    POP_PAGE = 'instacar/navigation/POP',
    WEB_ROUTE_CHANGED = 'instacar/navigation/WEB_ROUTE_CHANGED',
    SHOW_DIALOG = 'instacar/navigation/SHOW_DIALOG',
    HIDE_DIALOG = 'instacar/navigation/HIDE_DIALOG',
    REMOVE_DIALOG = 'instacar/navigation/REMOVE_DIALOG',
    PUSH_SCREEN = 'instacar/navigation/PUSH_SCREEN',
    SHOW_ALERT = 'instacar/navigation/SHOW_ALERT',
    HIDE_ALERT = 'instacar/navigation/HIDE_ALERT',
}

export enum PushTypes {
    MODAL,
    MODAL_FULL_SCREEN,
    CARD,
}

export interface RouteDefintion {
    screen: string,
    container: React.ComponentType,
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
    id: string,
    fullScreen: boolean,
    props: any,
}

export interface HideDialogAction {
    type: TypeKeys.HIDE_DIALOG,
    id: string,
}

export interface RemoveDialogAction {
    type: TypeKeys.REMOVE_DIALOG,
    id: string, //DIALOG_IDS,
}

export interface ShowAlertAction {
    type: TypeKeys.SHOW_ALERT,
    alertId: string,
    body: string,
    bodyData?: Object,
    leftButtonText?: string,
    rightButtonText?: string,
}

export interface HideAlertAction {
    type: TypeKeys.HIDE_ALERT,
    alertId: string,
    body: string,
}

export type ActionTypes =
    | ToggleDrawerAction
    | PopPageAction
    | WebRouteChangedAction
    | PushScreenAction
    | ShowDialogAction
    | HideDialogAction
    | RemoveDialogAction
    | ShowAlertAction
    | HideAlertAction

export interface DialogData {
    id: string,
    visible: boolean,
    fullScreen: boolean,
    props: any,
}

export interface AlertData {
    alertId: string,
    body: string,
    bodyData?: Object,
    visible: boolean,
    leftButtonText?: string,
    rightButtonText?: string,
}

export interface NavigationState {
    screen: string,
    drawerOpen: boolean,
    screenProps?: any,
    props: any,
    dialogs: Array<DialogData>,
    alerts: Array<AlertData>,
}

export const initialState = {
    screen: isWeb ? location.pathname.substring(1): '',
    drawerOpen: false,
    props: null,
    dialogs: [],
    alerts: [],
};

export interface Route {
    screen: string,
    container: React.ComponentType,
    title: string,
    pushType?: PushTypes,
}

export let routes: {[route: string]: Route} = {};

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
                dialogs: clearHiddenDialogs(state.dialogs || []),
            };
        case TypeKeys.SHOW_DIALOG:
            return {
                ...state,
                dialogs: [
                    ...clearHiddenDialogs(state.dialogs || []),
                    {
                        id: action.id,
                        visible: true,
                        fullScreen: action.fullScreen,
                        props: action.props,
                    },
                ]
            };
        case TypeKeys.HIDE_DIALOG:
            return {
                ...state,
                dialogs: hideDialogFromList(state.dialogs, action.id),

            };
        case TypeKeys.REMOVE_DIALOG:
            return {
                ...state,
                dialogs: removeDialogFromList(state.dialogs, action.id)
            };
        case TypeKeys.SHOW_ALERT:
            return {
                ...state,
                alerts: [
                    ...state.alerts, {
                        body: action.body,
                        bodyData: action.bodyData,
                        alertId: action.alertId,
                        visible: true,
                        leftButtonText: action.leftButtonText,
                        rightButtonText: action.rightButtonText,
                    }],
            };
        case TypeKeys.HIDE_ALERT:
            return {
                ...state,
                alerts: state.alerts
                    .filter(alert => alert.visible)
                    .map(alert => (
                        alert.alertId === action.alertId && alert.body === action.body
                        ? {
                            ...alert,
                            visible: false,
                        }
                        : alert
                    )),
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
): ShowDialogAction | PushScreenAction => {
    const {screen, pushType, title} = routeDefinition;
    if (isWeb) {
        switch (pushType) {
            case PushTypes.MODAL:
                return {
                    type: TypeKeys.SHOW_DIALOG,
                    id: screen,
                    fullScreen: false,
                    props,
                };
            case PushTypes.MODAL_FULL_SCREEN:
                return {
                    type: TypeKeys.SHOW_DIALOG,
                    id: screen,
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

export const popScreen = (navigation: any, history: any) => {
    return (dispatch: any, getState: () => {navigation: NavigationState}) => {
        let state = getState(), visibleDialogs = state.navigation.dialogs.filter(dialog => dialog.visible);
        if (isWeb) {
            if (visibleDialogs.length > 0) {
                dispatch({
                    type: TypeKeys.HIDE_DIALOG,
                    id: visibleDialogs.slice(-1)[0].id,  // get last visible dialog
                });
                return;
            }
        } else {
            navigation.goBack()
        }
        dispatch({
            type: TypeKeys.POP_PAGE,
        })
    }
};

export function hideDialog(id: string): HideDialogAction {
    // if dialogIndex is null, clear all dialogs
    return {
        type: TypeKeys.HIDE_DIALOG,
        id,
    }
}

export function removeDialog(id: string): RemoveDialogAction {
    // if dialogIndex is null, clear all dialogs
    return {
        type: TypeKeys.REMOVE_DIALOG,
        id,
    }
}


const hideDialogFromList = (dialogs: Array<DialogData>, id: string) => {

    let found = false, newDialogs: Array<DialogData> = [];
    const reversedDialogs = [...dialogs].reverse();
    for (let dialog of reversedDialogs) {
        if (!found && dialog.id === id) {
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
};

const removeDialogFromList = (dialogs: Array<DialogData>, id: string) => {

    let found = false, newDialogs: Array<DialogData> = [];
    const reversedDialogs = [...dialogs].reverse();
    for (let dialog of reversedDialogs) {
        if (!found && dialog.id === id) {
            found = true;
        }
        else {
            newDialogs.push(dialog);
        }
    }
    return newDialogs.reverse();
};

const clearHiddenDialogs = (dialogs: Array<DialogData>): Array<DialogData> => {
    return [...dialogs.filter(dialog => dialog.visible)];
};

export const setRoutes = (targetRoutes: {[route: string]: Route}) => {
    routes = targetRoutes;
};

export const showAlert = (
    body: string,
    bodyData: Object | undefined = undefined,
    alertId: string = DEFAULT_ALERT_ID,
    leftButtonText?: string,
    rightButtonText?: string,
): ShowAlertAction => {
    return {
        type: TypeKeys.SHOW_ALERT,
        body,
        bodyData,
        alertId,
        leftButtonText,
        rightButtonText,
    }
};

export const hideAlert = (body: string, alertId: string = DEFAULT_ALERT_ID) => {
    return {
        type: TypeKeys.HIDE_ALERT,
        alertId,
        body,
    }
};

