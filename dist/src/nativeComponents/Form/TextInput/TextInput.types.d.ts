import { TEXT_INPUT_TYPES } from "../../../utils/enums";
export interface TextInputProps {
    error?: string;
    id?: string;
    inputType?: TEXT_INPUT_TYPES;
    labelPositionLeft?: boolean;
    onBlur?: () => null;
    input: {
        onChange?: (text: string) => void;
        value?: string;
    };
    onFocus?: () => void;
    placeholder?: string;
    title?: string;
    multiline?: boolean;
}
