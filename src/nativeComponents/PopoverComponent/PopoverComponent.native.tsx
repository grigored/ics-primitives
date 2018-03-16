import * as React from "react";
import { OwnProps } from "src/nativeComponents/PopoverComponent/PopoverComponent";

class CPopoverComponent2 extends React.PureComponent<OwnProps, {}> {

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

export const PopoverComponent2: React.ComponentType<OwnProps> = connectActionSheet(CPopoverComponent2);