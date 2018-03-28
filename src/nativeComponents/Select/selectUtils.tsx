import { Option } from "../../redux/FormComponents/FormComponents.types";

export const NOT_AVAILABLE_FIELD_VALUE = 'select component field unavailable';
export const NOT_AVAILABLE = 'not available';

// export function getSelectData(props: SelectProps & FieldStatePropsNoParams<SelectDBValue>) {
export function getSelectData(props: any) {

    let {nullName, options, nullable, error, value,} = props,
        optionsValues = options.map((option: any) => option.value);

    let translatedError = error;
    let selectedValue = null; //can't be undefined on web
    if (value !== undefined){
        selectedValue = value;
    }
    if (optionsValues.indexOf(value) === -1) {
        selectedValue = nullable ? NOT_AVAILABLE_FIELD_VALUE : optionsValues[0];
    }
    let selectedIndex = optionsValues.indexOf(selectedValue);
    let selectedTitle = String(nullName || NOT_AVAILABLE);
    if(selectedIndex !== -1) {
        selectedTitle = options[selectedIndex].text;
    }

    let optionsList = (!nullable ? [...options] : [{
        text: String(nullName || NOT_AVAILABLE),
        value: NOT_AVAILABLE_FIELD_VALUE
    }, ...options]).map((option, index) => ({
        key: index,
        index: index,
        label: getLabel(option),
        value: option.value,
    }));
    return {
        error: translatedError,
        selectedValue,
        selectedIndex,
        selectedTitle,
        optionsList,
    }
}

function getLabel(option: Option) {
    if (!option) {
        return '';
    }
    return String(option.text || option.value);
}
