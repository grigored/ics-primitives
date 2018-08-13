import { isIOS } from "../platform/platform";
import {TouchableOpacity, TouchableNativeFeedback} from 'react-native';

export const Touchable = isIOS ? TouchableOpacity: TouchableNativeFeedback;
