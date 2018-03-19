import { isWeb } from "../../primitives/platform/platform";

export enum TypeKeys {
    TOGGLE_DRAWER = 'instacar/navigation/TOGGLE_DRAWER',
    POP_PAGE = 'instacar/navigation/POP',
    WEB_ROUTE_CHANGED = 'instacar/navigation/WEB_ROUTE_CHANGED',
    SHOW_DIALOG = 'instacar/navigation/SHOW_DIALOG',
    PUSH_SCREEN = 'instacar/navigation/PUSH_SCREEN',
}

export enum PushTypes {
    MODAL,
    MODAL_FULL_SCREEN,
    CARD,
}

export interface RouteDefintion {
    path: string,
    container: React.ComponentClass,
    pushType: PushTypes,
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
    path: string,
    props: any,
}

export type ActionTypes =
    | ToggleDrawerAction
    | PopPageAction
    | WebRouteChangedAction

export interface NavigationState {
    screen: string,
    drawerOpen: boolean,
    screenProps?: any,
}

const initialState = {
    screen: isWeb ? location.pathname.substring(1): '',
    drawerOpen: false,
};

export const navigation = function(state: NavigationState = initialState, action: ActionTypes): NavigationState {
    switch (action.type) {
        case TypeKeys.TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: action.drawerOpen !== null && action.drawerOpen !== undefined ? action.drawerOpen : !state.drawerOpen,
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
        drawerOpen
    }
};


export const pushScreen = (
    navigation: any,
    history: any,
    routeDefinition: RouteDefintion,
    props: any | null,
) => {
    if (isWeb) {
        switch (routeDefinition.pushType) {
            case PushTypes.MODAL:
                return {
                    type: TypeKeys.SHOW_DIALOG,
                    dialogId: routeDefinition.path,
                    fullScreen: false,
                    props,
                };
            case PushTypes.MODAL_FULL_SCREEN:
                return {
                    type: TypeKeys.SHOW_DIALOG,
                    dialogId: routeDefinition.path,
                    fullScreen: false,
                    props,
                };
            default:
                history.push('/' + routeDefinition.path);
                return {
                    type: TypeKeys.PUSH_SCREEN,
                    path: routeDefinition.path,
                    props,
                }
        }
    } else {
        navigation.navigate(screen, props);
        return {
            type: TypeKeys.PUSH_SCREEN,
            path: routeDefinition.path,
            props,
        }
    }
};
