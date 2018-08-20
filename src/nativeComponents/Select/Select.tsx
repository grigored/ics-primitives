import * as React from "react"
import SelectMaterial from '@material-ui/core/Select';
import { createStyles, isXs, WithStyles } from '../../';
import { appTheme } from '../..';
import { getSelectData } from "./selectUtils";
import { FieldStateProps, Option, SelectDBValue, SelectProps } from "../../redux/FormComponents/FormComponents.types";
import { FormControl, FormHelperText, InputLabel, MenuItem } from "@material-ui/core";


const styles = () => ( {
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
} );

class CSelect extends React.PureComponent<SelectProps & FieldStateProps<SelectDBValue> & WithStyles, {}> {

    render() {
        const {
                classes,
                disabled,
                disableUnderline,
                error,
                nullName,
                onChange,
                options,
                title,
                value,
                multiple,
                nullable,
                selectStyles
            } = this.props,
            {
                selectedIndex,
                selectedIndexMultiple,
                optionsList,
            } = getSelectData( options, value, multiple, nullName, nullable );

        return (
            <FormControl error={!!error} fullWidth>
                {
                    title &&
                    <InputLabel
                        classes={{
                            root: classes.label as any,
                        }}
                        focused={classes.focusedLabel as any}
                    >
                        {title}
                    </InputLabel>
                }
                <SelectMaterial
                    native={isXs()}
                    value={
                        multiple
                            ? selectedIndexMultiple
                            : selectedIndex === -1 ? 0 : selectedIndex}
                    onChange={( event: any ) => {
                        if (multiple) {
                            onChange && onChange(
                                ( event.target.value || [] ).map( ( i: number ) => optionsList[i].value )
                            );
                        } else {
                            onChange && onChange(
                                optionsList[event.target.value].value
                            );
                        }
                    }}
                    error={!!error}
                    fullWidth={true}
                    disabled={disabled}
                    disableUnderline={disableUnderline}
                    multiple={multiple || false}
                    classes={selectStyles}
                >
                    {optionsList.map( ( option: Option, index: number ) => (
                        isXs()
                            ? <option key={index} value={index}>{option.text}</option>
                            : <MenuItem key={index} value={index}>{option.text}</MenuItem>
                    ) )}
                </SelectMaterial>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        );
    }
}

export const Select: React.ComponentType<SelectProps & FieldStateProps<SelectDBValue>> =
    createStyles( styles, 'Select' )( CSelect );