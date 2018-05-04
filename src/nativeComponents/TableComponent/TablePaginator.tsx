// import * as React from 'react';
// import { InjectedTranslateProps } from 'react-i18next';
// import { createStyles, View, WithStyles } from '../../index';
// import { isWeb } from '../../primitives/platform/platform';
// import { Select } from '../Select/Select';
// import { ITEMS_PER_PAGE_OPTIONS } from './TableComponent';
// import { TablePageNavigator } from './TablePageNavigator';
//
// const styles = {
//     container: {
//         flexDirection: 'column',
//         flex: 1,
//     },
//     pagination: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     itemsPerPage: {
//         flexBasis: 160,
//     }
// };
//
// export interface PaginatorData {
//     itemsPerPage: number,
//     page: number,
// }
//
// export interface Props {
//     paginate?: boolean,
//     totalItems?: number,
//     onPaginateChange?: (d: PaginatorData) => void,
// }
//
// type AllProps = Props & WithStyles & InjectedTranslateProps;
//
// class CTablePaginator extends React.PureComponent<AllProps, PaginatorData> {
//     constructor(props: AllProps) {
//         super(props);
//         this.state = {
//             itemsPerPage: 5,
//             page: 1,
//         };
//     }
//     render() {
//         const {classes, children, paginate, onPaginateChange} = this.props,
//             totalItems = this.props.totalItems || 0;
//         if (!paginate) {
//             return children;
//         }
//         const {itemsPerPage, page} = this.state;
//         return (
//             <View style={classes.container}>
//                 {children}
//                 <View style={classes.pagination}>
//                     <View style={classes.itemsPerPage}>
//                         <Select
//                             options={ITEMS_PER_PAGE_OPTIONS()}
//                             onChange={( value: number ) => {
//                                 const newState = {
//                                     itemsPerPage: value,
//                                     page: 1,
//                                 };
//                                 this.setState(newState);
//                                 onPaginateChange && onPaginateChange(newState);
//                             }}
//                             value={!!itemsPerPage ? itemsPerPage : 5}
//                             title={isWeb ? undefined : (!!itemsPerPage ? itemsPerPage.toString() : '5')}
//                             nullable={false}
//                         />
//                     </View>
//                     {
//                         <TablePageNavigator
//                             // style={{ marginLeft: appTheme.defaultMargin }}
//                             itemsCount={totalItems}
//                             itemsLowerLimit={itemsPerPage * (page - 1) + 1}
//                             itemsUpperLimit={Math.min(itemsPerPage * page, totalItems)}
//                             currentPage={page}
//                             pagesCount={
//                                 totalItems % itemsPerPage === 0
//                                     ? totalItems / itemsPerPage
//                                     : Math.floor(totalItems / itemsPerPage) + 1
//                             }
//                             changePage={
//                                 ( value ) => {
//                                     const newState = {
//                                         ...this.state,
//                                         page: value,
//                                     };
//                                     this.setState(newState);
//                                     onPaginateChange && onPaginateChange(newState);
//                                 }
//                             }
//                         />
//                     }
//                 </View>
//             </View>
//         );
//     }
// }
//
// export const TablePaginator: React.ComponentType<Props> = createStyles(
//     styles,
//     'TablePaginator'
// )(CTablePaginator);
