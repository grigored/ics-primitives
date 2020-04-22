import * as React from 'react';
import {TextInputDBValue, TextInputProps} from "./TextInput.types";
import {FieldStateProps} from "../../redux/FormComponents/FormComponents.types";
import {Text} from '../../primitives/Text/Text.sketch';
import {appTheme, createStyles, Testable, WithStyles} from "../..";
import {View} from '../../primitives/View/View.sketch';

const styles = () => ({
    text: {
        flex: 1,
        color: appTheme.tradingPage.textColor,
        marginLeft: '7px',
        marginTop: '3px',
    },
    label: {
        color: appTheme.tradingPage.textColor,
        fontSize: appTheme.fontSizeS,
    },
    borderInput: {
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: appTheme.tradingPage.textColor,
        width: '100%',
        padding: 0,
        minHeight: 27,
        fontWeight: '400',
        fontSize: 14,
        justifyContent: 'center',
    },
});

export type Props = TextInputProps & FieldStateProps<TextInputDBValue> & WithStyles & Testable

export class CTextInput extends React.PureComponent<Props, { focused: boolean }> {
    render() {
        let {
            title,
            classes,
            placeholder,
        } = this.props;

        return (
            <View>
                {
                    title && <Text style={[
                        classes.label,
                    ]}>
                        {title}
                    </Text>
                }
                {
                    <View
                        style={classes.borderInput}
                    >
                        <Text style={classes.text}>
                            {placeholder}
                        </Text>
                    </View>
                }
            </View>
        );
    }
}

export const TextInput: React.ComponentType<TextInputProps & FieldStateProps<TextInputDBValue>> = createStyles(
    styles,
    'TextInput'
)(CTextInput);
