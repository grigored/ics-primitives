import * as React from 'react';
import { connect } from 'react-redux';
import { getNestedField, isWeb } from '../';
import { hoistNonReactStatics } from '../lib/hoist-non-react-statics';
import { History, Navigation, pushScreen, routes, } from '../redux/reducers/navigation';

type componentType<T> = React.ComponentType<T & Navigation & History> | React.ComponentClass<T & Navigation & History>

export const requireAuthentication = <T extends Object>( WrappedComponent: componentType<T> ): componentType<T> => {
    interface ConnectedProps {
        isLoggedIn: boolean,
        pushScreen: typeof pushScreen,
    }

    type AllProps = T & Navigation & History & ConnectedProps;

    class CEnhance extends React.Component<AllProps, {}> {

        static checkRedirect( props: Readonly<AllProps> ) {
            if (!isWeb) {
                return;
            }
            if (!routes.LOGIN) {
                console.log('Error: LOGIN route not set use "setRoutes(routes)"');
                return;
            }
            let {pushScreen, navigation, history, isLoggedIn} = props;
            if (!isLoggedIn) {
                pushScreen(navigation, history, routes.LOGIN, null);
            }
        }

        componentWillMount() {
            CEnhance.checkRedirect(this.props);
        }

        componentWillReceiveProps( nextProps: AllProps ) {
            CEnhance.checkRedirect(nextProps);
        }

        render() {
            const {isLoggedIn} = this.props;
            if (!isWeb) {
                if (!isLoggedIn) {
                    const LoginBody = routes.LOGIN.container;
                    return <LoginBody/>
                }
            }
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }

    const Enhance = connect(
        ( state: any, ownProps: T & Navigation & History ) => ({
                isLoggedIn: getNestedField(state.persisted, ['login', 'isLoggedIn']),
        }),
        {
            pushScreen,
        }
    )(CEnhance);
    // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
    hoistNonReactStatics(Enhance, WrappedComponent);
    return Enhance;
};
