import { TEXT_INPUT_TYPES } from '../../utils/enums';

export const parseValue = ( textInputType: TEXT_INPUT_TYPES, value: string ): any => {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            return parseInt(value);
        case TEXT_INPUT_TYPES.FLOAT:
            return parseFloat(value);
        case TEXT_INPUT_TYPES.JSON:
            try {
                return JSON.parse(value || '');
            } catch (err) {
                return {};
            }
        default:
            return value;
    }
};
