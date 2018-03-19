import * as React from "react";
import { OwnProps } from "./PopoverComponent.types";
import { connectActionSheet } from "src/utils/addActionSheet.native";
import { _t } from "src/utils/common";
import { ACTION_SHEETS_IDS } from "src/utils/enums";

class CPopoverComponent extends React.PureComponent<OwnProps, {}> {

    static actionSheetData = (props: OwnProps) => {
        let {actions} = props,
            sheetActions = [
                ...actions,
                {
                    title: 'Cancel',
                    onClick: () => {
                    },
                    // icon: iconList.cancel,
                }
            ];
        return {
            [ACTION_SHEETS_IDS.POPOVER_ITEM_CLICK]: {
                options: sheetActions.map(option => _t(option.title)),
                optionClick: (index: number) => {
                    sheetActions[index] && sheetActions[index].onClick();
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

export const PopoverComponent: React.ComponentType<OwnProps> = connectActionSheet(CPopoverComponent) as any;