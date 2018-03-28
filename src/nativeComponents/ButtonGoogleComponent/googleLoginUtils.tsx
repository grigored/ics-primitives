/**
 * Created by alexbuicescu on 21 - Mar 2018.
 */

import { AllProps } from './ButtonGoogleComponent.type';

declare global {
    interface Window {
        gapi?: any,
    }
}

export function googleComponentDidMount( props: AllProps ) {
    const {autoLoad, loadedGoogleSdk} = props,
        scope = 'profile email';
    // scope = 'profile email ' + (
    //     params.required_user_fields.indexOf(REQUIRED_USER_FIELDS.google_calendar) !== -1
    //         ? 'https://www.googleapis.com/auth/calendar' :
    //         ''
    // );

    const fjs: HTMLScriptElement = document.getElementsByTagName('script')[0];
    let js: HTMLScriptElement = document.createElement('script');
    js.id = 'google-login';
    js.src = '//apis.google.com/js/client:platform.js';
    if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
    }
    js.onload = () => {
        window.gapi.load('auth2', () => {
            loadedGoogleSdk();
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init({
                    client_id: '123', //params.google_server_app_id,
                    // cookiepolicy: cookiePolicy,
                    // login_hint: loginHint,
                    // hosted_domain: hostedDomain,
                    scope,
                });
            }
            if (autoLoad) {
                googleOnClick(props);
            }
        });
    };
}

export function googleOnClick( props: AllProps ) {
    if (props.googleSdkIsLoaded) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        let {redirectUri, approvalPrompt} = props;
        const options = {
            redirect_uri: redirectUri,
            approval_prompt: approvalPrompt,
        };
        auth2.grantOfflineAccess(options)
            .then(( res: any ) => {
                googleSignInSuccessCallback(props, res);
            }, ( err: any ) => {
                googleSignInFailCallback(props, err);
            });
    }
}

function googleSignInSuccessCallback( props: AllProps, response: any ) {
    if (response.code === null) {
        return;
    }
    let {socialLogin, referralCode} = props;
    socialLogin('url-here', 'post', 'google', response.code, response.code, referralCode || null, null);
}

function googleSignInFailCallback( props: any, response: any ) {
}


export function googleSignOut() {

}