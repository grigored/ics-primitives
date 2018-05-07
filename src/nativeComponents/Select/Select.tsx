import * as React from "react"
import {MenuItem} from 'material-ui/Menu';
import SelectMaterial from 'material-ui/Select';
import { default as Input, InputLabel } from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import { createStyles, isXs, WithStyles } from '../../';
import { appTheme } from '../../index';
import { getSelectData, NOT_AVAILABLE_FIELD_VALUE } from "./selectUtils";
import { FieldStateProps, Option, SelectDBValue, SelectProps } from "../../redux/FormComponents/FormComponents.types";
import { SELECT_INPUT_TYPES } from "../../utils/enums";

class SelectOption extends React.PureComponent<Option, {}> {
    render() {
        const {children, ...other} = this.props;
        return isXs()
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

const styles = () => ({
    underline: {
        '&:after': {
            backgroundColor: appTheme.primaryColor,
        },
        '&:before': {
            backgroundColor: appTheme.textInputUnderlineColor,
        },
        '&:hover:not($disabled):before': {
            backgroundColor: `${appTheme.textInputUnderlineColor} !important`,
        },
    },
    underlineError: {},
    input: {
        color: appTheme.textColor,
    },
    icon: {
        color: appTheme.textColor,
    },
    label: {
        color: appTheme.textColor,
    },
    focusedLabel: {
        color: appTheme.primaryColor,
    },
});

class CSelect extends React.PureComponent<SelectProps & FieldStateProps<SelectDBValue> & WithStyles, {}> {
    render() {
        const {title, onChange, disabled, selectInputType, disableUnderline, classes} = this.props;
        let {error, selectedValue, optionsList} = getSelectData(this.props);

        return (
            <FormControl error={!!error} fullWidth>
                {
                    title &&
                    <InputLabel
                        classes={{
                            root: classes.label as any,
                        }}
                        FormControlClasses={{
                            focused: classes.focusedLabel as any,
                        }}
                    >
                        {title}
                    </InputLabel>}
                <SelectMaterial
                    native={isXs()}
                    value={selectedValue!}
                    onChange={(event) => {
                        let value: any = null;
                        if (event.target.value !== NOT_AVAILABLE_FIELD_VALUE) {
                            value = raw2db(event.target.value, selectInputType);
                        }
                        onChange && onChange(value);
                    }}
                    error={!!error}
                    fullWidth={true}
                    disabled={disabled}
                    disableUnderline={disableUnderline}
                    input={
                        <Input
                            classes={{
                                input: classes.input as any,
                                underline: !!error ? classes.underlineError : classes.underline as any,
                            }}
                        />
                    }
                    classes={{
                        icon: classes.icon as any,
                    }}
                >
                    {optionsList.map((option) =>
                        <SelectOption
                            text={option.label}
                            value={option.value}
                        >
                            {option.label}
                        </SelectOption>
                    )}
                </SelectMaterial>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        );
    }
}

export const Select: React.ComponentType<SelectProps & FieldStateProps<SelectDBValue>> =
    createStyles(styles, 'Select')(CSelect);