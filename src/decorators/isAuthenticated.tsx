import * as React from 'react';
import { connect } from 'react-redux';
import { getNestedField } from '../';
import { hoistNonReactStatics } from '../lib/hoist-non-react-statics';
import { History, Navigation, pushScreen, routes, } from '../redux/reducers/navigation';

type componentType<T> = React.ComponentType<T & Navigation & History> | React.ComponentClass<T & Navigation & History>

export const isAuthenticated = <T extends Object>(check2FA: boolean) => {
    return ( WrappedComponent: componentType<T> ): componentType<T> => {
        interface ConnectedProps {
            userData: any,
            validated2FA: boolean,
            pushScreen: typeof pushScreen,
        }

        type AllProps = T & Navigation & History & ConnectedProps;

        class CEnhance extends React.Component<AllProps, {}> {

            static checkRedirect(props: Readonly<AllProps>) {
                if (!routes.LOGIN) {
                    console.log('Error: LOGIN route not set use "setRoutes(routes)"');
                    return;
                }
                let {userData, pushScreen, navigation, history, validated2FA} = props;
                if (!userData || (check2FA && !validated2FA)) {
                    pushScreen(navigation, history, routes.LOGIN, null);
                }
            }

            componentWillMount() {
                CEnhance.checkRedirect(this.props);
            }

            componentWillReceiveProps(nextProps: AllProps) {
                CEnhance.checkRedirect(nextProps);
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
                userData: getNestedField(state.persisted, ['login', 'userData']),
                validated2FA: getNestedField(state.persisted, ['login', 'validated2FA']),
            }),
            {
                pushScreen,
            }
        )(CEnhance);
        // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
        hoistNonReactStatics(Enhance, WrappedComponent);
        return Enhance;
    };
};
