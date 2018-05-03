// import * as React from 'react';
// import { Artboard, Page, } from 'react-sketchapp';
// import {setWindowWidth} from "../primitives/platform/platform.sketch";
//
// const DESKTOP = {
//         WIDTH: 750,
//         MIN_HEIGHT: 1200,
//         TOPBAR: 200,
//     // },
//     // MOBILE = {
//     //     WIDTH: 750,
//     //     MIN_HEIGHT: 1334,
//     //     TOPBAR: 200,
//     };
//
// export const renderComponent = (pageName: string, Component: any) => {
//     setWindowWidth(DESKTOP.WIDTH);
//     const desktopView = (
//         <Artboard
//             style={{
//                 position: 'absolute',
//                 left: 0,
//                 top: 0,
//                 width: DESKTOP.WIDTH,
//                 minHeight: DESKTOP.MIN_HEIGHT - DESKTOP.TOPBAR,
//             }}
//             name={pageName + '_desktop'}
//         >
//             <Component/>
//         </Artboard>
//     );
//     // setWindowWidth(DESKTOP.WIDTH);
//     // const mobileView = (
//     //     <Artboard
//     //         style={{
//     //             position: 'absolute',
//     //             left: DESKTOP.WIDTH + 50,
//     //             top: 0,
//     //             width: MOBILE.WIDTH,
//     //             minHeight: MOBILE.MIN_HEIGHT - MOBILE.TOPBAR,
//     //
//     //         }}
//     //         name={pageName + '_mobile'}
//     //     >
//     //         <Component/>
//     //     </Artboard>
//     // );
//     return (
//         <Page name={pageName}>
//             {desktopView}
//         </Page>
//     );
// };
