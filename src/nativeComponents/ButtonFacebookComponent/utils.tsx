// /**
//  * Created by alexbuicescu on 21 - Mar 2018.
//  */
//
// import { AllProps } from './ButtonFacebookComponent.types';
//
// declare const FB: any;
//
// export function fbComponentDidMount( props: AllProps ) {
//     let {fbLoadSdk, fbSdkLoaded, fbStatusChangeCallback} = props;
//     // let fbAppId = params && params.facebook_app_id!;
//     let fbAppId = '123';
//     // let inviteCode = this.props.location.query.code;
//     fbLoadSdk(fbAppId, fbSdkLoaded, fbStatusChangeCallback, props.referralCode);
// }
//
// export function fbOnClick( props: AllProps ) {
//     FB.login(null, {scope: 'email, user_friends'});
// }
//
// export function fbSignOut() {
//     if (FB && FB.getAuthResponse()) {
//         FB.logout(( response: any ) => {
//         });
//     }
// }