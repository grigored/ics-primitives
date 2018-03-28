/**
 * Created by alexbuicescu on 21 - Mar 2018.
 */

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { AllProps } from './ButtonFacebookComponent.types';

export function fbComponentDidMount( props: AllProps ) {
}

export function fbOnClick( props: AllProps ) {
    // this is a hack because of
    // https://github.com/joonhocho/react-native-google-sign-in/issues/33
    // need to hide the modal and only open google login once hte modal is fully hidden
    // hopefully users login so rarely that waiting a few millis on this won't be a big issue

    // props.navigator && props.navigator.dismissModal();

    // setTimeout(() => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
        ( result: any ) => {
            if (result.isCancelled) {
            } else {
                AccessToken.getCurrentAccessToken().then(
                    ( data: any ) => {
                        if (!data || !data.accessToken || !data.userID) {
                            alert('Login failed');
                        }
                        let {socialLogin} = props;
                        // let inviteCode = props.location && props.location.query.code;
                        socialLogin(
                            'url-here',
                            'post',
                            'facebook',
                            data && data.accessToken && data.accessToken.toString(),
                            data && data.userID && data.userID.toString(),
                            null,
                            null,
                        )
                    }
                );
            }
        },
        ( error: any ) => {
            alert('Login failed with error: ' + error);
        }
    );
    // }, 500);

}

export function fbSignOut() {
    LoginManager.logOut();
}