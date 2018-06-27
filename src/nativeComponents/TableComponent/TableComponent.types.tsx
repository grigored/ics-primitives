import { destroy, initialize } from 'redux-form';
import { FieldDefinition, FORM_INPUT_TYPES } from "../../";
import { FormErrorChecker } from "../../redux/FormComponents/Form";
import { FieldReduxData } from "../../redux/FormComponents/FormComponents.types";
import { setPersistentTableOptions } from "../../redux/reducers/persistedTableOptions";
import {
    clearTableData, loadTableData, setRefreshTable, showEntryDetails, showMenu,
    TableEntryDetail
} from "../../redux/reducers/table";

export interface TableRowAction {
    title?: string,
    titleXs?: string,
    icon?: any,
    iconXs?: any,
    onPress: ( row?: Row ) => void,
}

export interface BaseColumn {
    dataFormat?: ( cell: any, row: any ) => any,
    preferredWidth?: number,
    notSortable?: boolean,
    hiddenInTable?: boolean,
    visibleByDefault?: boolean,
    modalDisplay?: number,
    fullRow?: ( row: Row | undefined ) => boolean,
    description?: string,
}

export type TableColumn = (FieldDefinition | {
    type: any,
    field: string,
    title: string,
} | {
    // often we don't need a type, as we just use dataFormat and don't have modal (for example reservation.orders)
    field: string,
    title: string,
    type?: FORM_INPUT_TYPES,
}) & BaseColumn

export interface TableDefinitionData {
    columns: (( extraData: any ) => Array<TableColumn>),
    dataName: string,
    title: string,
    url?: string,
    allowFilters: boolean,
    mixRows?: ( response: any ) => Array<Row>,
    rowStyle?: ( row: any ) => any,
    formErrorChecker?: FormErrorChecker,
}

export interface Fields {
    [key: string]: FieldReduxData,
}

export interface TableFilterFormData {
    order?: string,
    pages?: number,
}

export interface TableFilterPersistentData {
    visibleColumns: Array<string>,
    wrapRows: boolean,
}

export interface TableFormData {
    [key: string]: any,
}

export interface TableData {
    loading?: boolean,
    refresh?: boolean,
    data?: Data,
    menuShown?: boolean,
    menuRow?: Row,
}

export interface Data {
    items: Array<Row>,
    extra_data?: ExtraData,
}

export interface ExtraData {
    page: number,
    items_per_page: number,
    total_items: number,

    [key: string]: any,
}

export interface Row {
    [key: string]: number | string | null,
}

export interface OwnProps {
    tableDefinition: TableDefinitionData,
    extraActions?: Array<TableRowAction>,
    tableActions?: Array<TableRowAction>,
    editFunc?: ( row: Row ) => void,
    // navigation: NavigationType,
    // pageId: string,
    title: string,
    refreshMethod?: () => void,
    url?: string,
    mixRows?: ( response: any ) => Array<Row>,
    clearDataOnUnmount?: boolean,
    hideRefreshButton?: boolean,
    paginate?: boolean,
    tableContainerName?: string,
    tableData?: TableData,
    extraData?: any,
}

export interface ConnectedProps {

    loadingData: boolean,
    openedTableRow: Row,
    refreshTable: boolean,
    tableData: TableData,
    tableFilterFormData: {
        order: string,

    },
    tableFilterPersistentData: TableFilterPersistentData,
    tableId: string,
    tableDetailsEntry: {
        details: Array<TableEntryDetail>,
        itemName: string | number,
        componentName: string,
    },

    destroy: typeof destroy,
    clearTableData: typeof clearTableData,
    initialize: typeof initialize,
    loadTableData: typeof loadTableData,
    // pushScreen: typeof pushScreen,
    setPersistentTableOptions: typeof setPersistentTableOptions,
    setRefreshTable: typeof setRefreshTable,
    showMenu: typeof showMenu,
    showEntryDetails: typeof showEntryDetails,
}
