import * as React from 'react';
import {createStyles, View, WithStyles} from "../..";
import {all, web} from "../../utils/theme";
import {StyleSheetClass} from "../../utils/theme.types";

const styles = {
    elevation: {
        [web]: {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        },
        [all]: {
            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 2
            },

            shadowRadius: 4,
            shadowOpacity: 1.0
        }
    },
};

export interface Props {
    style?: StyleSheetClass,
    name?: string,
}

class CPaper extends React.PureComponent<Props & WithStyles>{
    render() {
        const {children, classes, style, name} = this.props;
        return (
            <View name={name} style={[classes.elevation, style]}>
                {children}
            </View>
        );
    }
}

export const Paper: React.ComponentType<Props> = createStyles(styles, 'Paper')(CPaper);
