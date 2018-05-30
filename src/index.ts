declare global {
    interface Window {
        opera?: string;
        MSStream?: string;
        INSTACAR_LOCALE?: string;
        googleMapsCallback?: Function;
        fbAsyncInit?: any
    }
}

export { createStyles } from './decorators/createStyles/createStyles';
export { Link } from './primitives/Link/Link';
export { Image } from './primitives/Image/Image';
export { ScrollView } from './primitives/ScrollView/ScrollView';
export { Text } from './primitives/Text/Text';
export { Touchable } from './primitives/Touchable/Touchable';
export { View } from './primitives/View/View';
export { Form } from './redux/FormComponents/Form';
export { FORM_INPUT_TYPES, TEXT_INPUT_TYPES, HTTP_METHOD, PLATFORM } from './utils/enums';
export { WithStyles, Classes } from './utils/theme.types';
export { all, appTheme, android, ios, native, web, webDesktop, webMobile, } from './utils/theme';

export { Button, fade } from './nativeComponents/Button/Button';
export { Dialog } from './nativeComponents/Dialog/Dialog';
export { AppContainerWeb } from './nativeComponents/AppContainerWeb/AppContainerWeb';
// export { TextInput } from './nativeComponents/Form/TextInput/TextInput';
// export { Form } from './nativeComponents/Form/Form';
// export { FieldDefinition } from './nativeComponents/Form/form.types';

// export { FORM_INPUT_TYPES, TEXT_INPUT_TYPES } from './utils/enums';
export { isXs, getNestedField, getPersistStore, autoRehydrate } from './utils/common';

export { apiClientMiddleware } from './redux/apiClientMiddleware';

export {
    // DisplayErrorsAction,
    // SendFormDataAction,
    // SendFormDataSuccessAction,
    // SendFormDataFailAction,
    formHelpers,
    sendFormData,
    formHasErrors,
    displayErrors,
} from './redux/reducers/formHelpers';
export {
    auth,
    AuthState,
    signup,
    login,
    socialLogin,
    logout,
    logoutLocal,
    fbLoadSdk,
    loadGoogleSdk,
    loadedGoogleSdk,
    validate2FA,
} from './redux/reducers/auth';
export {
    persisted,
    PersistedState,
    updatePersist,
    setCodePushChecked,
    setHeaders,
} from './redux/reducers/persisted';
export { FieldDefinition, FormHelpersState, FormState } from './redux/FormComponents/FormComponents.types'
export * from './primitives/platform/platform';
export { CircularProgressComponent } from './primitives/CircularProgressComponent/CircularProgressComponent'
export { LoadingContainer } from './primitives/LoadingContainer'

export {
    navigation,
    toggleDrawer,
    pushScreen,
    popScreen,
    hideDialog,
    PushTypes,
    NavigationState,
    Navigation,
    History,
    setRoutes,
    showAlert,
    hideAlert,
} from './redux/reducers/navigation';
export { TableComponent } from './nativeComponents/TableComponent/TableComponent';
export {
    TableDefinitionData, TableColumn, TableRowAction, TableData,
} from './nativeComponents/TableComponent/TableComponent.types';
export { table, setRefreshTable } from './redux/reducers/table';
export { persistedTableOptions } from './redux/reducers/persistedTableOptions';
export { TopBarButton } from './nativeComponents/TopBarButton/TopBarButton.native';
export { requireAuthentication } from './decorators/requireAuthentication'
export { getFormDbValue } from './redux/FormComponents/Form.utils';
export { addTopbar } from './decorators/addTopbar/addTopbar';
export { Alert } from './nativeComponents/Alert/Alert';
export { PlatformStyleRules } from './utils/theme.types';
export { Select } from './nativeComponents/Select/Select';