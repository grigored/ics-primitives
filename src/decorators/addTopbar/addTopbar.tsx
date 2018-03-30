import * as React from "react";
import { View } from "../../primitives/View/View";
import { appTheme } from "../../utils/theme";
import { hoistNonReactStatics } from "../../lib/hoist-non-react-statics";


interface NavigationOptions {
    headerLeft: any,
    title: any,
    headerRight: any,
}

// TODO set proper type for WrappedComponent (it must check for existence of navigationOptions)
export function addTopbar<T>(WrappedComponent: any): React.ComponentType<T> {

    if (!WrappedComponent.navigationOptions) {
        return WrappedComponent;
    }

    class Enhance extends React.PureComponent<T & {navigation: any}, {}> {

        render() {
            const navigationOptions: NavigationOptions = (
                typeof WrappedComponent.navigationOptions === 'function'
                    ? WrappedComponent.navigationOptions({navigation: this.props.navigation})
                    : WrappedComponent.navigationOptions
            );
            return (
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                    }}
                >
                    <View
                        style={{
                            height: appTheme.topBarHeight,
                            backgroundColor: appTheme.topbarColor,
                            zIndex: 100,
                            width: '100%',
                            position: 'absolute',
                            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
                        }}
                    >
                        {
                            navigationOptions.headerLeft
                        }

                        {
                            navigationOptions.title
                        }

                        {
                            navigationOptions.headerRight
                        }

                    </View>
                    <View
                        style={[
                            {
                                width: '100%',
                                top: appTheme.topBarHeight,
                                bottom: 0,
                                position: 'absolute',
                            },
                        ]}
                    >
                        <WrappedComponent
                            {...this.props}
                        />
                    </View>
                </View>
            )
        }
    }

    // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
    hoistNonReactStatics(Enhance, WrappedComponent);
    return Enhance;
}
