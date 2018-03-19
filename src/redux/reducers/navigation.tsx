import { isWeb } from "../../primitives/platform/platform";

export enum TypeKeys {
    TOGGLE_DRAWER = 'instacar/navigation/TOGGLE_DRAWER',
    POP_PAGE = 'instacar/navigation/POP',
    WEB_ROUTE_CHANGED = 'instacar/navigation/WEB_ROUTE_CHANGED',
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
}

export const toggleDrawer = (navigation: any, drawerOpen?: boolean) => {
    if (!isWeb) {
        navigation.navigate(drawerOpen ? 'DrawerOpen': 'DrawerClose');
    }
    return {
        type: TypeKeys.TOGGLE_DRAWER,
        drawerOpen
    }
};
