import * as React from 'react';
import { View } from '../../primitives/View/View';

export const ThemeProvider: React.StatelessComponent<{}> = ({children}) => (
    <View style={{flex: 1}} name={"ThemeProvider"}>
        {children}
    </View>
);
