import { Option } from "../../redux/FormComponents/FormComponents.types";

export const NOT_AVAILABLE_FIELD_VALUE = 'select component field unavailable';

export function getSelectData(
    options: Array<Option>,
    value: any,
    multiple?: boolean,
    nullName?: string,
    nullable?: boolean,
): {selectedIndex: number, optionsList: Array<Option>} {
    let selectedIndex = -1;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === value) {
            selectedIndex = i;
            break;
        }
    }
    let showNull =  nullable || selectedIndex === -1;
    return {
        selectedIndex,
        optionsList: showNull && !multiple ? [{text: nullName || '', value: 0}, ...options]: options,
    }
}
