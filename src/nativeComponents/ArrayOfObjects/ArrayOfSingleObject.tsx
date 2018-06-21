// import * as React from 'react';
// import { FormItem } from "src/components/FormComponents/FormItem";
// import { ArrayOfSingleObjectProps, DBValue, FieldCommon } from "src/components/FormComponents/index";
// import { SimpleButton } from "src/components/SimpleButton/SimpleButton";
// import { Button, Text, View } from "src/primitives";
// import { Params } from "src/utils";
// import { _t } from "src/utils/i18n";
// import { iconList } from "src/utils/navigation/iconsList";
// import { appTheme } from "src/utils/theme";
// import { WithStyles } from "src/utils/types.native";
// import { createStyles } from "src/utils/utils";
//
// const styles = () => ( {
//     container: {
//         flexDirection: 'column',
//         flexGrow: 1,
//         flexShrink: 0,
//         margin: appTheme.defaultVerticalMargin,
//     },
//     objectContainer: {
//         flexDirection: 'column',
//     }
// } );
//
// type Props = ArrayOfSingleObjectProps & OwnProps & FieldCommon & WithStyles
//
// interface OwnProps {
//     value: Array<DBValue>,
//     error?: string,
//     params: Params,
//     onChange: ( value: DBValue ) => void,
// }
//
// class CArrayOfSingleObject extends React.PureComponent<Props, {}> {
//
//     addItem() {
//         let { value, onChange } = this.props;
//         onChange( [...( value || [] ), null] );
//     }
//
//     removeItem( index: number ) {
//         let { value, onChange } = this.props;
//         onChange( ( value || [] ).filter( ( val: any, valueIndex: number ) => index !== valueIndex ) );
//     }
//
//     onItemChanged( objectIndex: number, newValue: DBValue ) {
//         let { value, onChange } = this.props;
//
//         if (objectIndex > value.length) {
//             return;
//         }
//
//         let newFieldValue = [
//             ...value.slice( 0, objectIndex ),
//             newValue,
//             ...value.slice( objectIndex + 1 ),
//         ];
//
//         onChange( newFieldValue );
//     }
//
//     render() {
//         let { classes, value, fieldDefinition, params, error, field, title } = this.props;
//         let shownValue = value;
//         if (( shownValue && shownValue.constructor !== Array ) || !shownValue) {
//             shownValue = [];
//         }
//         return (
//             <View style={classes.container}>
//                 {!!title && <Text>{_t( title )}</Text>}
//                 {
//                     shownValue.map( ( objectValue: DBValue, index: number ) => (
//                         <View
//                             style={classes.objectContainer}
//                             key={field + '_' + fieldDefinition.field + '_' + index}
//                         >
//                             <FormItem
//                                 fieldDefinition={fieldDefinition}
//                                 params={params}
//                                 input={{
//                                     value: objectValue,
//                                     onChange: this.onItemChanged.bind( this, index ),
//                                 }}
//                             />
//                             <Button
//                                 icon={iconList.cancel}
//                                 title={'Remove object'}
//                                 onPress={this.removeItem.bind( this, index )}
//                             />
//                         </View>
//                     ) )
//                 }
//                 <SimpleButton
//                     onPress={this.addItem.bind( this )}
//                     title={'Add new object'}
//                 />
//                 {
//                     !!error && <Text style={{ color: 'red' }}>{_t( error )}</Text>
//                 }
//             </View>
//         );
//     }
// }
//
// const componentName = 'ArrayOfSingleObject';
// export const ArrayOfSingleObject: any = createStyles<ArrayOfSingleObjectProps>(
//     styles,
//     componentName,
//     CArrayOfSingleObject
// );