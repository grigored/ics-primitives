import * as React from 'react';
import { Text, View } from '../src';
// import { Text } from '../src/primitives/Text/Text';
// import { View } from '../src/primitives/View/View';


export class SimplePage extends React.PureComponent<{}, {}> {
    render() {
        return (
            <View>
                <Text>Example text</Text>
            </View>
        );
    }
}