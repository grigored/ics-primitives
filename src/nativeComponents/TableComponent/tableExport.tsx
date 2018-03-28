import * as FileSaver from 'file-saver';
import { getNestedField } from '../../utils/common';
import { Row, TableColumn, TableData } from './TableComponent.types';
import { getExportFormattedValue } from './tableUtils';

export function exportToCsv( fileName: string, columns: TableColumn[], tableData: TableData ) {
    const separator = ',';
    const replacer = ( key: string, value: string ) => value === null ? '' : value;
    const header = columns.map( column => column.title );
    let items: Array<Row> = getNestedField( tableData, ['data', 'items'] );
    if (!!items) {
        let csv = items.map( ( row: Row ) =>
            columns
                .map( column => JSON.stringify( getExportFormattedValue( row, column ), replacer ) )
                .join( separator )
        );
        csv.unshift( header.join( separator ) );
        let processedCsv = csv.join( '\r\n' );
        let blob = new Blob( [processedCsv], { type: "text/csv;charset=utf-8" } );
        FileSaver.saveAs( blob, fileName );
    }
}
