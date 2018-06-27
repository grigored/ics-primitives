import { Option } from "../../redux/FormComponents/FormComponents.types";

export const NOT_AVAILABLE_FIELD_VALUE = 'select component field unavailable';

export function getSelectData( options: Array<Option>,
                               value: any,
                               multiple?: boolean,
                               nullName?: string,
                               nullable?: boolean, ): {
    selectedIndex: number,
    selectedIndexMultiple: Array<number>,
    optionsList: Array<Option>,
} {
    if (multiple) {
        let selectedIndexMultiple = [];
        for (let i = 0; i < options.length; i++) {
            if (value && value.indexOf( options[i].value ) !== -1) {
                selectedIndexMultiple.push( i );
            }
        }
        return {
            selectedIndex: -1,
            selectedIndexMultiple,
            optionsList: options,
        }
    } else {
        let selectedIndex = -1;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                selectedIndex = i;
                break;
            }
        }
        let showNull = nullable || selectedIndex === -1;
        return {
            selectedIndex,
            selectedIndexMultiple: [],
            optionsList: showNull ? [{ text: nullName || '', value: 0 }, ...options] : options,
        }
    }
}
