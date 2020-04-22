// import * as React from 'react';
// import {appTheme, createStyles, Image, Testable, Text, WithStyles} from '../../';
// import {ButtonProps} from './Button.types';
// import {View} from "../../primitives/View/View.sketch";
//
// export {fade} from '@material-ui/core/styles/colorManipulator';
//
// const styles = () => ({
//     container: {
//         display: 'flex',
//         padding: '8px 16px',
//         minWidth: 64,
//         minHeight: 36,
//         boxSizing: 'border-box',
//         fontFamily: appTheme.fontFamily,
//         fontWeight: '500',
//         borderRadius: 4,
//         cursor: 'pointer',
//         border: 0,
//         outline: 'none',
//         position: 'relative',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'inherit',
//         fontSize: appTheme.fontSizeM,
//     },
// });
//
// type Props = ButtonProps & WithStyles & Testable
//
// class CButton extends React.PureComponent<Props, {}> {
//     onClick(ev: any) {
//         let {onPress, href} = this.props;
//         if (!!onPress) {
//             onPress(ev)
//         }
//         if (!!href) {
//             window.location.assign(href);
//         }
//     }
//
//     render() {
//         const {
//             children,
//             iconLeft,
//             iconRight,
//             styles,
//             title,
//             classes,
//             labelColor,
//             backgroundColor,
//         } = this.props;
//
//         let buttonStyle = (styles && styles.root) || {},
//             labelStyle = (styles && styles.label) || {};
//
//         const containerStyle = [
//             buttonStyle,
//             classes.container,
//             !!backgroundColor ? {backgroundColor} : {},
//         ];
//
//         return (
//             <View
//                 style={containerStyle}
//             >
//                 {
//                     iconLeft &&
//                     <Image
//                         style={[styles && styles.iconLeft]}
//                         source={iconLeft}
//                     />
//                 }
//                 <Text
//                     style={[
//                         labelStyle,
//                         !!labelColor ? {color: labelColor} : {}
//                     ]}
//                 >
//                     {title}
//                 </Text>
//                 {
//                     iconRight &&
//                     <Image
//                         style={[styles && styles.iconRight]}
//                         source={iconRight}
//                     />
//                 }
//                 {children}
//             </View>
//         );
//     }
// }
//
// export const Button = createStyles(styles, 'Button')(CButton) as React.ComponentType<ButtonProps & Testable>;
export { Button } from './Button.native'