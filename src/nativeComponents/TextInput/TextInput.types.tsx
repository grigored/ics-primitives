import {TEXT_INPUT_TYPES} from "../../utils/enums";

export interface TextInputProps {
    error?: string,
    id?: string,
    inputType: TEXT_INPUT_TYPES,
    labelPositionLeft?: boolean,
    onBlur?: () => void,
    onChange?: any // optional, don't want controlled components for autocomplete, datepicker
    onFocus?: () => void,
    placeholder?: string,
    title?: string,
    value?: string,
    multiline?: boolean,
}