import * as React from "react"
import {MenuItem} from 'material-ui/Menu';
import SelectMaterial from 'material-ui/Select';
import {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import { isXs } from "src";
import { getSelectData, NOT_AVAILABLE_FIELD_VALUE } from "src/nativeComponents/Select/selectUtils";
import { SelectDBValue, SelectProps } from "src/redux/FormComponents/FormComponents.types";
import { _t } from "src/utils/common";
import { SELECT_INPUT_TYPES } from "src/utils/enums";

class SelectOption extends React.PureComponent<SelectOptionProps, {}> {
    render() {
        const {children, ...other} = this.props;
        return isXs
            ? <option {...other}>{children}</option>
            : <MenuItem {...other}>{children}</MenuItem>
    }
}

const raw2db = (rawValue: string, selectInputType?: SELECT_INPUT_TYPES): string | number => {
    switch (selectInputType) {
        case SELECT_INPUT_TYPES.INT:
            return parseInt(rawValue);
        case SELECT_INPUT_TYPES.FLOAT:
            return parseFloat(rawValue);
        default:
            return rawValue;
    }
};

export const Select = (props: SelectProps & FieldStatePropsNoParams<SelectDBValue>) => {
    const {title, onChange, disabled, selectInputType} = props;
    let {error, selectedValue, optionsList} = getSelectData(props);

    return (
        <FormControl error={!!error} fullWidth>
            {title && <InputLabel>{_t(title)}</InputLabel>}
            <SelectMaterial
                native={isXs()}
                value={selectedValue}
                onChange={(event) => {
                    let value = null;
                    if (event.target.value !== NOT_AVAILABLE_FIELD_VALUE) {
                        value = raw2db(event.target.value, selectInputType);
                    }
                    onChange && onChange(value);
                }}
                error={!!error}
                fullWidth={true}
                disabled={disabled}
            >
                {optionsList.map((option) =>
                    <SelectOption
                        key={option.key}
                        value={option.value}
                    >
                        {option.label}
                    </SelectOption>
                )}
            </SelectMaterial>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};
