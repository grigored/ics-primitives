import { FORM_INPUT_TYPES } from "../..";
import { TableColumn, Row } from "./TableComponent.types";
import { Option } from "../../redux/FormComponents/FormComponents.types";
import { getNestedField } from "../../utils/common";
// import { FROM_EXTENSION, ITEMS_PER_PAGE_FIELD, ORDER_FIELD, PAGE_FIELD, TO_EXTENSION } from "./TableComponent";

// export function getFilterString( tableFilterFormData?: TableFilterFormData ) {
//     if (!tableFilterFormData) {
//         return '';
//     }
//     // let fields = tableFilterFormData,
//     let value = '',
//         filterStrings = Object.keys( tableFilterFormData )
//             .map( ( fieldName: string ) => {
//                 if (fieldName === ITEMS_PER_PAGE_FIELD || fieldName === PAGE_FIELD) {
//                     return fieldName + '=' + tableFilterFormData[fieldName];
//                 }
//                 if (fieldName === ORDER_FIELD) {
//                     return fieldName + '=' + tableFilterFormData[fieldName];
//                 }
//                 if (fieldName.endsWith( FROM_EXTENSION )) {
//                     value = tableFilterFormData[fieldName];
//                     return value && fieldName.replace( FROM_EXTENSION, '' ) + '>=' + value;
//                 }
//                 if (fieldName.endsWith( TO_EXTENSION )) {
//                     value = tableFilterFormData[fieldName];
//                     return value && fieldName.replace( TO_EXTENSION, '' ) + '<=' + value;
//                 }
//                 if (fieldName === 'id' || fieldName === 'user_id') {
//                     value = tableFilterFormData[fieldName].replace( /\D/g, '' );
//                     return value && fieldName + '~' + value.replace( /\D/g, '' );
//                 }
//                 value = tableFilterFormData[fieldName];
//                 if (!value) {
//                     return;
//                 }
//                 let operator = value.endsWith( ' ' ) ? '=' : '~';
//                 return fieldName + operator + value.trim();
//
//             } );
//     return filterStrings.filter( filterString => !!filterString ).join( '&' );
// }

export function getExportFormattedValue( row: Row, column: TableColumn ) {
    let dataFormatter = column.dataFormat || ( ( value: any, row: Row ) => value );
    if (column.field.indexOf( '!' ) !== -1) {
        return dataFormatter( getNestedField( row, column.field.split( '!' ) ), row );
    }
    return dataFormatter( row[column.field], row );
}

export function getFormattedValue( row: Row | undefined, column: TableColumn ) {
    if (!row) {
        return '-';
    }

    if (column.type === FORM_INPUT_TYPES.SELECT) {
        if (!( column as { options: Array<Option> } ).options) {
            return '';
        }
        let selectedOption = ( column as { options: Array<Option> } ).options.filter( ( value: any ) => {
            return value.value === row[column.field];
        } );
        return selectedOption.length === 0 ? '-' : selectedOption[0].text;
    }
    return getExportFormattedValue( row, column );
}
