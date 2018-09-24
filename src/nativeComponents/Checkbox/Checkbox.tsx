import { FormControl, InputLabel } from "@material-ui/core";
import * as React from 'react';
import { createStyles, View, WithStyles } from "../..";
import { CheckboxProps } from "./Checkbox.types";

const styles = () => ( {
    container: {
        flex: 1,
        flexDirection: 'column',
        minWidth: 100,
        minHeight: 100,
    },
    label: {
        flexShrink: 0,
    },
} );

class CCheckbox extends React.PureComponent<CheckboxProps & WithStyles, {}> {
    render() {
        let { error, onChange, title, value, classes } = this.props;
        return (
            <FormControl error={!!error}>
                <View>
                    {
                        title &&
                        <InputLabel
                            classes={{
                                root: classes.label as any,
                            }}
                        >
                            {title}
                        </InputLabel>
                    }
                    <input
                        type={'checkbox'}
                        {...( value!== null && value !== undefined ? { checked: value } : {} )}
                        onChange={( value ) => onChange( value )}
                    />
                </View>
            </FormControl>
        );
    }
}

export const Checkbox = createStyles( styles, 'Checkbox' )( CCheckbox ) as React.ComponentType<CheckboxProps>;