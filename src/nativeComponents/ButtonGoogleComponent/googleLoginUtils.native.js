// /**
//  * Created by alexbuicescu on 21 - Mar 2018.
//  */
//
// import GoogleSignIn from 'react-native-google-sign-in';
//
// export function googleComponentDidMount(props) {
//     // used on web
//     props.loadedGoogleSdk();
// }
//
// export function googleOnClick(props) {
//     // used on web
//     // noinspection JSIgnoredPromiseFromCall
//     login(props);
// }
//
// async function login(props) {
//     let {socialLogin} = props;
//     await GoogleSignIn.configure({
//         clientID: '123', //getNativeIosGoogleAppId(),
//         serverClientID: '123', //params.google_server_app_id,
//         scopes: ['email', 'profile'],
//         shouldFetchBasicProfile: true,
//         offlineAccess: true,
//
//     });
//
//
//     const user = await GoogleSignIn.signInPromise();
//     let serverAuthCode = user.serverAuthCode && user.serverAuthCode.toString();
//     socialLogin('url-here', 'post', 'google', serverAuthCode, serverAuthCode, null, "http://localhost:5000")
// }
//
// export async function googleSignOut() {
//     await GoogleSignIn.signOut();
//     const user = await GoogleSignIn.signOutPromise();
// }