// /**
//  * Created by alexbuicescu on 21 - Mar 2018.
//  */
//
// import { loadedGoogleSdk, loadGoogleSdk, socialLogin } from '../../redux/reducers/auth';
//
// export interface Props {
//     approvalPrompt?: boolean,  // not sure if boolean is correct
//     autoLoad?: boolean;
//     checkLogin: () => boolean,
//     label?: string,
//     pathname?: string,
//     redirectUri?: string,
//     referralCode?: string,
// }
//
// export interface ConnectedProps {
//     googleSdkIsLoaded: boolean,
//     socialLogin: typeof socialLogin,
//     loadGoogleSdk: typeof loadGoogleSdk,
//     loadedGoogleSdk: typeof loadedGoogleSdk,
// }
//
// export type AllProps = Props & ConnectedProps;