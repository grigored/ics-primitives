export interface TopbarProps {
    leftButtonIcon?: any;
    leftButtonOnPress?: () => void;
    title: string;
    rightButtonsData?: Array<any>;
    drawerOpen: boolean;
}
