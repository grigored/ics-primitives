import { isIOS } from "../platform/platform";
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';
export var Touchable = isIOS ? TouchableOpacity : TouchableNativeFeedback;
//# sourceMappingURL=Touchable.native.js.map