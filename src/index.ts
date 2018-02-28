export { createStyles } from './primitives/createStyles/createStyles';
export { Link } from './primitives/Link/Link';
export { Image } from './primitives/Image/Image';
export { ScrollView } from './primitives/ScrollView/ScrollView';
export { Text } from './primitives/Text/Text';
export { Touchable } from './primitives/Touchable/Touchable';
export { View } from './primitives/View/View';
export { Form } from './redux/Form/Form';
export { FORM_INPUT_TYPES, TEXT_INPUT_TYPES } from './utils/enums';
export { WithStyles, Classes } from './utils/theme.types';
export { all, appTheme, android, ios, native, web, webDesktop, webMobile, } from './utils/theme';

export { Button } from './nativeComponents/Button/Button';
// export { Dialog } from './nativeComponents/Dialog/Dialog';
export { AppContainerWeb } from './nativeComponents/AppContainerWeb/AppContainerWeb';
// export { TextInput } from './nativeComponents/Form/TextInput/TextInput';
// export { Form } from './nativeComponents/Form/Form';
// export { FieldDefinition } from './nativeComponents/Form/form.types';

// export { FORM_INPUT_TYPES, TEXT_INPUT_TYPES } from './utils/enums';
export { isXs } from './utils/common';

export { apiClientMiddleware } from './redux/apiClientMiddleware';

import { reducer as formReducer } from 'redux-form'
import { formHelpers } from './redux/reducers/formHelpers';
export const reducers = {formHelpers, form: formReducer};
