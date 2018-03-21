import * as React from 'react';
import { connect } from 'react-redux';
import { hoistNonReactStatics } from '../lib/hoist-non-react-statics';
import { History, Navigation, pushScreen, routes, } from '../redux/reducers/navigation';

type componentType<T> = React.ComponentType<T & Navigation & History> | React.ComponentClass<T & Navigation & History>

export const isAuthenticated = <T extends Object>( WrappedComponent: componentType<T> ): componentType<T> => {
    interface ConnectedProps {
        userData: any,
        pushScreen: typeof pushScreen,
    }

    class CEnhance extends React.Component<T & Navigation & History & ConnectedProps> {

        componentWillMount() {
            if (!routes.LOGIN) {
                console.log('Error: LOGIN route not set use "setLoginRoute(LOGIN_ROUTE)"');
                return;
            }
            let {userData, pushScreen, navigation, history} = this.props;
            if (userData) {
                pushScreen(navigation, history, routes.LOGIN, null);
            }
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }

    const Enhance = connect(
        ( state: any, ownProps: T & Navigation & History ) => ({
            userData: state.persisted.userData
        }),
        {
            pushScreen,
        }
    )(CEnhance);
    // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
    hoistNonReactStatics(Enhance, WrappedComponent);
    return Enhance;
};
