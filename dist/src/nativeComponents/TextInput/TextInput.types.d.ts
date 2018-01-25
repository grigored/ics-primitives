export declare enum TEXT_INPUT_TYPES {
    TEXT = 0,
    EMAIL = 1,
    INT = 2,
    FLOAT = 3,
    PASSWORD = 4,
    PHONE = 5,
    JSON = 6,
}
export interface TextInputProps {
    error?: string;
    id?: string;
    inputType: TEXT_INPUT_TYPES;
    labelPositionLeft?: boolean;
    onBlur?: () => null;
    onChange?: (text: string) => void;
    onFocus?: () => void;
    placeholder?: string;
    title?: string;
    value?: string;
    multiline?: boolean;
}
