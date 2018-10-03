import { FIELD_MUST_BE_NUMBER, FRACTIONAL_PART_TOO_LONG, INVALID_JSON_STRING } from "../../utils/strings";
import { TEXT_INPUT_TYPES } from '../../utils/enums';

export const DEFAULT_MAX_DECIMALS = 7;

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



export const getKeyboardType = ( inputType?: TEXT_INPUT_TYPES ): string => {
    switch (inputType) {
        case TEXT_INPUT_TYPES.PASSWORD:
            return 'password';
        case TEXT_INPUT_TYPES.EMAIL:
            return 'email';
        case TEXT_INPUT_TYPES.PHONE:
            return 'tel';
        default:
            return 'text';
    }
};

export const defaultGetError = ( textInputType: TEXT_INPUT_TYPES, rawValue: string, maxDecimals?: number ): string | undefined => {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            if (rawValue.indexOf( '.' ) !== -1) {
                return FIELD_MUST_BE_NUMBER
            }
            return rawValue !== '' && isNaN( +rawValue ) ? FIELD_MUST_BE_NUMBER : undefined;
        case TEXT_INPUT_TYPES.FLOAT:
            if (rawValue.indexOf('.') !== -1 ) {
                let fractionalPart = rawValue.split('.')[1];
                if(!!fractionalPart && !!maxDecimals) {
                    if (fractionalPart.length > maxDecimals) {
                        return FRACTIONAL_PART_TOO_LONG;
                    }
                }
            }
            return rawValue !== '' && isNaN( +rawValue ) ? FIELD_MUST_BE_NUMBER : undefined;
        case TEXT_INPUT_TYPES.JSON:
            try {
                JSON.parse( rawValue || '' );
                break;
            } catch (err) {
                return INVALID_JSON_STRING;
            }
    }
    return undefined;
};

export const defaultDbToRaw = ( textInputType: TEXT_INPUT_TYPES,
                         dbValue: any, ): string => {
    if (!dbValue) {
        return '';
    }
    switch (textInputType) {
        case TEXT_INPUT_TYPES.JSON:
            return JSON.stringify( dbValue, null, 2 );
        default:
            return dbValue.toString();
    }
};

export const defaultRawToDb = ( textInputType: TEXT_INPUT_TYPES, value: string ): any => {
    switch (textInputType) {
        case TEXT_INPUT_TYPES.INT:
            return parseInt( value );
        case TEXT_INPUT_TYPES.FLOAT:
            return parseFloat( value );
        case TEXT_INPUT_TYPES.JSON:
            try {
                return JSON.parse( value || '' );
            } catch (err) {
                return {};
            }
        default:
            return value;
    }
};
