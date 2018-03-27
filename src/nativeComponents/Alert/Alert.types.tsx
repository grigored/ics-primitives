
export interface AlertProps {
    alertId: string,
    title?: string,
    leftButtonText?: string, // if leftButtonText is passed in showDialog action, it will overwrite this prop
    rightButtonText?: string, // if rightButtonText is passed in showDialog action, it will overwrite this prop
    leftButtonOnPress?: () => void,
    rightButtonOnPress?: () => void,
    styles?: any,
}
