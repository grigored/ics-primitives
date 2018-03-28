/**
 * Created by alexbuicescu on 21 - Mar 2018.
 */

import { socialLogin } from '../../';
import { fbLoadSdk, fbSdkLoaded, fbStatusChangeCallback, } from '../../redux/reducers/auth';

export interface Props {
    label?: string,
    checkLogin: () => boolean,
    referralCode?: string,
}

export interface ConnectedProps {
    fbSdkLoaded: typeof fbSdkLoaded,
    fbStatusChangeCallback: typeof fbStatusChangeCallback,
    fbLoadSdk: typeof fbLoadSdk,
    socialLogin: typeof socialLogin,
}

export type AllProps = Props & ConnectedProps;
