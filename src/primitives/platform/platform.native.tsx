import {Dimensions, Platform} from 'react-native';

export const isWeb = false;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isSketch = false;
export const getWindowHeight = () => Dimensions.get('window').height;
export const getWindowWidth = () => Dimensions.get('window').width;


export function getScreenProps(props: any): any {
    return props.navigation && props.navigation.state.params;
}