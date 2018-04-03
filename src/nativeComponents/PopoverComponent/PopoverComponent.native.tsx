import * as React from "react";
import { OwnProps } from "./PopoverComponent.types";
import { ActionSheetNativeProps, connectActionSheet } from '../../utils/addActionSheet.native';
import { ACTION_SHEETS_IDS } from "../../utils/enums";

type AllProps = OwnProps & ActionSheetNativeProps;

class CPopoverComponent extends React.PureComponent<AllProps, {}> {

    static actionSheetData = (props: AllProps) => {
        let {actions} = props,
            sheetActions = [
                ...actions,
                {
                    title: 'Cancel',
                    onPress: () => {
                    },
                    // icon: iconList.cancel,
                }
            ];
        return {
            [ACTION_SHEETS_IDS.POPOVER_ITEM_CLICK]: {
                options: sheetActions.map(option => option.title),
                optionClick: (index: number) => {
                    sheetActions[index] && sheetActions[index].onPress();
                }
            }
        };
    };

    render() {
        const {children, connectedShowActionSheet} = this.props;
        return React.cloneElement(
            children,
            {
                onPress: () => {
                    connectedShowActionSheet(ACTION_SHEETS_IDS.POPOVER_ITEM_CLICK);
                }
            }
        );
    }
}

export const PopoverComponent: React.ComponentType<OwnProps> = connectActionSheet(CPopoverComponent);