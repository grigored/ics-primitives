import { TranslationFunction } from 'i18next';
import * as React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    appTheme, CircularProgressComponent, createStyles, FILTER_OPERATORS, FORM_INPUT_TYPES, Select, Text,
    TEXT_INPUT_TYPES, webDesktop
} from "../../index";
import { View } from '../../primitives/View/View';
import { setPersistentTableOptions } from '../../redux/reducers/persistedTableOptions';
import { loadTableData, showEntryDetails } from '../../redux/reducers/table';
import { getNestedField } from '../../utils/common';
import { CIRCULAR_PROGRESS_SIZE } from "../../utils/enums";
import { ACTIONS } from '../../utils/strings';
import { TextInput } from "../TextInput/TextInput";
import { TableActionsColumn } from './TableActionsColumn';
import { OwnProps, Row, TableColumn, TableFiltersData, TableProps, TableRowAction } from './TableComponent.types';
import { TableInner } from './TableInner';
import { TablePageNavigator } from "./TablePageNavigator";
import { TableTopActions } from './TableTopActions';
import { ACTIONS_COLUMN } from "./tableUtils";

const styles = {
    container: {
        maxWidth: '100%',
        flexDirection: 'column',
    },
    title: {
        flexShrink: 0,
        flexGrow: 0,
        height: 50,
        fontSize: appTheme.fontSizeXL,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filtersContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 0
    },
    filter: {
        width: 140,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 0,
        marginRight: 0,
    },
    paginate: {
        [webDesktop]: {
            marginTop: 16
        },
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
};

const FILTER_DELAY_MS = 333,
    DEFAULT_ITEMS_PER_PAGE = 10,
    NO_PAGINATE_ITEMS_COUNT = 1000;

export const EMPTY_SELECT_FILTER = {
    value: '',
    text: '',
};

const getActionsColumn = ( actions: Array<TableRowAction>, t: TranslationFunction ): TableColumn => {
    return {
        field: ACTIONS_COLUMN,
        title: ACTIONS,
        type: FORM_INPUT_TYPES.TABLE_ACTIONS,
        notSortable: true,
        preferredWidth: 120,
        dataFormat: ( cell: any, row: Row ) => {
            return (
                <TableActionsColumn
                    actions={actions}
                    t={t}
                    row={row}
                />
            );
        }
    };
};

export const getFilterValue: ( column: TableColumn, value: any ) => any = ( column: TableColumn, value: any ) => {
    if (value !== null && value !== undefined) {
        return value;
    }
    switch (column.type) {
        case FORM_INPUT_TYPES.TEXT:
            return '';
        case FORM_INPUT_TYPES.SELECT:
            return EMPTY_SELECT_FILTER.value;
        default:
            return null;
    }
};

export const getFilterForColumn: ( column: TableColumn,
                                   style: any,
                                   onChange: Function,
                                   value: any,
                                   t: Function ) => any = ( column: TableColumn,
                                                            style: any,
                                                            onChange: Function,
                                                            value: any,
                                                            t: Function ) => {
    switch (column.type) {
        case FORM_INPUT_TYPES.TEXT:
            return (
                <TextInput
                    {...column}
                    title={t( column.title )}
                    onChange={( value: any ) => onChange( value )}
                    inputType={TEXT_INPUT_TYPES.TEXT}
                    inputStyle={style}
                    value={value}
                />
            );
        case FORM_INPUT_TYPES.SELECT:

            return (
                <Select
                    {...column}
                    title={t( column.title )}
                    onChange={( value: any ) => onChange( value )}
                    inputStyle={style}
                    value={( value === null || value === undefined ) ? EMPTY_SELECT_FILTER.value : value}
                    options={[EMPTY_SELECT_FILTER, ...( column['options'] || [] )]}
                    nullable={false}
                />
            );
    }
    return null
};

class CTableComponent extends React.PureComponent<TableProps, {}> {
    _columns: Array<TableColumn> = [];
    _pagesData: {
        page: number,
        itemsPerPage: number,
        bindedSetPage: ( page: number ) => void,
        bindedSetItemsPerPage: ( itemsPerPage: number ) => void,
    };
    _filtersData: TableFiltersData;

    constructor( props: TableProps ) {
        super( props );

        this.setColumns( props );

        this._filtersData = {
            filters: {},
            filtersTimeout: null,
            bindedFiltersOnChange: {},
            bindedLoadTableData: props.loadTableData.bind( this, props.tableDefinition.url, props.tableId ),
        };
        this._pagesData = {
            page: 0,
            itemsPerPage: !!props.tableDefinition.itemsPerPage
                ? (
                    typeof props.tableDefinition.itemsPerPage === 'object'
                        ? props.tableDefinition.itemsPerPage[0]
                        : props.tableDefinition.itemsPerPage
                )
                : DEFAULT_ITEMS_PER_PAGE,
            bindedSetPage: this.setPage.bind( this ),
            bindedSetItemsPerPage: this.setItemsPerPage.bind( this ),
        };
        this._columns.filter( ( column: TableColumn ) => column.hasFilter )
            .forEach( ( column: TableColumn ) => {

                this._filtersData.filters[column.field] = {};

                this._filtersData.bindedFiltersOnChange[column.field] = {
                    value: this.setFilter.bind( this, column.field, false ),
                };

                if (column['operator'] === FILTER_OPERATORS.BETWEEN) {
                    this._filtersData.bindedFiltersOnChange[column.field].upperValue =
                        this.setFilter.bind( this, column.field, true );
                }

            } )
    }

    loadData() {
        this._filtersData.bindedLoadTableData( this.getLoadDataRequestObject() );
    }

    getColumnOperator( field: string ) {
        for (let i = 0; i < this._columns.length; i++) {
            if (this._columns[i].field === field) {
                return this._columns[i]['operator'];
            }
        }
        console.log( 'Could not get filter operator for field', field );
        return '~';
    }

    getLoadDataRequestObject() {
        let { tableDefinition } = this.props;
        let filters: Array<any> = [],
            page = tableDefinition.paginate
                ? this._pagesData.page
                : 0,
            itemsPerPage = tableDefinition.paginate
                ? this._pagesData.itemsPerPage
                : NO_PAGINATE_ITEMS_COUNT;
        for (let field in this._filtersData.filters) {
            if (this._filtersData.filters.hasOwnProperty( field )) {

                let value = this._filtersData.filters[field].hasOwnProperty( 'value' )
                    ? this._filtersData.filters[field].value!.toString()
                    : undefined,

                    upperValue = this._filtersData.filters[field].hasOwnProperty( 'upperValue' )
                        ? this._filtersData.filters[field].upperValue!.toString()
                        : undefined;

                if (value !== undefined || upperValue !== undefined) {
                    filters.push( {
                        column: field,
                        operator: this.getColumnOperator( field ),
                        value,
                        upperValue,
                    } );
                }
            }
        }
        return filters.length > 0
            ? {
                filters,
                page,
                itemsPerPage,
            }
            : {
                page,
                itemsPerPage,
            };
    }

    setPage( page: number ) {
        this._pagesData = {
            ...this._pagesData,
            page,
        };
        this.loadData();
    }

    setItemsPerPage( itemsPerPage: number ) {
        this._pagesData = {
            ...this._pagesData,
            page: 0,
            itemsPerPage,
        };
        this.loadData();
    }

    setFilter( field: string, isUpperValue: boolean, value: string ) {

        if (value === null || value === undefined || value === '') {
            if (isUpperValue && !!this._filtersData.filters[field]) {
                delete( this._filtersData.filters[field].upperValue );
            } else {
                delete( this._filtersData.filters[field].value )
            }
        } else {
            if (isUpperValue) {
                this._filtersData.filters[field].upperValue = value
            } else {
                this._filtersData.filters[field].value = value;
            }
        }

        this._pagesData.page = 0;
        clearTimeout( this._filtersData.filtersTimeout );
        this._filtersData.filtersTimeout = setTimeout( () => {
            this.loadData();
        }, FILTER_DELAY_MS );
    }

    setColumns( props: TableProps ) {
        let { tableDefinition, extraData, extraActions, t } = props;

        this._columns = tableDefinition.columns( { ...( extraData || {} ), t } ).filter(
            ( column: TableColumn ) => !column.hiddenInTable
        );
        if (!!extraActions) {
            this._columns = [getActionsColumn( extraActions, t ), ...this._columns];
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps( nextProps: TableProps ) {
        if (this.props.extraData !== nextProps.extraData) {
            this.setColumns( nextProps );
        }
        if (!!this.props.tableData && !this.props.tableData.refresh && nextProps.tableData.refresh) {
            this.loadData();
        }
    }

    render() {
        let {
                classes, loadingData, tableDefinition, tableData, title, tableActions, style, t,
            } = this.props,
            hasFilters = this._columns.filter( column => column.hasFilter ).length > 0;

        return (
            <View style={[classes.container, style]}>
                <View style={classes.flexRow}>
                    {!!title && <Text style={classes.title}>{title}</Text>}

                    {loadingData &&
                    <View style={{ marginLeft: 16 }}>
                        <CircularProgressComponent size={CIRCULAR_PROGRESS_SIZE.SMALL}/>
                    </View>
                    }
                </View>

                {
                    hasFilters && tableDefinition.filtersOnTop &&
                    <View style={classes.filtersContainer}>
                        {
                            this._columns.filter( column => column.hasFilter ).map( column => (
                                <View
                                    key={'table_' + tableDefinition.title + '_filter_' + column.field}
                                    style={classes.filter}
                                >
                                    {
                                        getFilterForColumn(
                                            column,
                                            { input: classes.filters },
                                            this._filtersData.bindedFiltersOnChange[column.field].value,
                                            getFilterValue(
                                                column,
                                                getNestedField(
                                                    this._filtersData.filters,
                                                    [column.field, 'value']
                                                )
                                            ),
                                            t,
                                        )
                                    }
                                    {
                                        column['operator'] === FILTER_OPERATORS.BETWEEN &&
                                        getFilterForColumn(
                                            column,
                                            { input: classes.filters },
                                            this._filtersData.bindedFiltersOnChange[column.field].upperValue!,
                                            getFilterValue(
                                                column,
                                                getNestedField(
                                                    this._filtersData.filters,
                                                    [column.field, 'upperValue']
                                                )
                                            ),
                                            t,
                                        )
                                    }
                                </View>
                            ) )
                        }
                    </View>
                }

                <TableTopActions
                    columns={this._columns}
                    refreshMethod={
                        !!tableDefinition.url
                            ? () => this.loadData()
                            : undefined
                    }
                    tableData={tableData}
                    title={tableDefinition.title}
                    tableActions={tableActions}
                />

                <TableInner
                    columns={this._columns}
                    tableData={tableData && tableData.data}
                    showFilters={hasFilters && !tableDefinition.filtersOnTop}
                    filtersData={this._filtersData}
                    tableDefinition={tableDefinition}
                />

                {
                    tableDefinition.paginate && tableData && tableData.data &&
                    <TablePageNavigator
                        itemsCount={tableData.data.totalItemsNumber}
                        itemsLowerLimit={
                            tableData.data.totalItemsNumber
                                ? tableData.data.itemsPerPage * tableData.data.page + 1
                                : 0
                        }
                        itemsUpperLimit={
                            tableData.data.itemsPerPage
                                ? Math.min(
                                tableData.data.itemsPerPage * ( tableData.data.page + 1 ),
                                tableData.data.totalItemsNumber,
                                )
                                : 0
                        }
                        currentPage={tableData.data.page}
                        pagesCount={Math.ceil( tableData.data.totalItemsNumber / tableData.data.itemsPerPage )}
                        changePage={this.setPage.bind( this )}
                        jumpToFirstIcon={tableDefinition.paginateIcons && tableDefinition.paginateIcons.jumpToFirstIcon}
                        jumpToLastIcon={tableDefinition.paginateIcons && tableDefinition.paginateIcons.jumpToLastIcon}
                        itemsPerPageValue={this._pagesData.itemsPerPage}
                        itemsPerPageOptions={
                            typeof tableDefinition.itemsPerPage === 'object'
                                ? tableDefinition.itemsPerPage
                                : undefined
                        }
                        changeItemsPerPage={this._pagesData.bindedSetItemsPerPage}
                        style={classes.paginate}
                    />
                }

            </View>
        )
    }
}

const componentName = 'TableComponent';

export const TableComponent = compose(
    translate(),
    connect(
        ( state: any, ownProps: OwnProps ) => {
            let tableId: string = ownProps.tableContainerName || ownProps.tableDefinition.dataName;
            return {
                loadingData: getNestedField( state.table, [tableId, 'loading'] ),
                openedTableRow: getNestedField( state.table, [tableId, 'menuRow'] ),
                tableData: ownProps.tableData || state.table[tableId],
                tableId: tableId,
            }
        }, {
            loadTableData,
            setPersistentTableOptions,
            showEntryDetails,
        }
    ),
    createStyles(
        styles,
        componentName
    ),
)(
    CTableComponent
) as React.ComponentType<OwnProps>;
