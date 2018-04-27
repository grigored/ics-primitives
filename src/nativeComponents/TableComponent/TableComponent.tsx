import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { destroy, initialize } from 'redux-form';
import {
    all, appTheme, Button, createStyles, FORM_INPUT_TYPES, isXs, native, Text, TEXT_INPUT_TYPES, View, web,
    webDesktop, webMobile, WithStyles
} from '../../';
import { isWeb } from '../../primitives/platform/platform';
import { ScrollView } from '../../primitives/ScrollView/ScrollView';
import { DBValue, Option } from '../../redux/FormComponents/FormComponents.types';
import { FormItem } from '../../redux/FormComponents/FormItem';
import { setPersistentTableOptions } from '../../redux/reducers/persistedTableOptions';
import { clearTableData, loadTableData, setRefreshTable, showEntryDetails, showMenu } from '../../redux/reducers/table';
import { getNestedField, shallowEqual } from '../../utils/common';
import { MOMENT_FORMAT } from '../../utils/enums';
import { formatDate } from '../../utils/i18n';
import { ACTIONS, EXPORT, REFRESH } from '../../utils/strings';
import { PopoverComponent } from '../PopoverComponent/PopoverComponent';
import {
    ConnectedProps, OwnProps, Row, TableColumn, TableDefinitionData, TableFilterFormData,
    TableFormData
} from './TableComponent.types';
import { exportToCsv } from './tableExport';
import { PaginatorData, TablePaginator } from './TablePaginator';
import { getFilterString, getFormattedValue } from './tableUtils';

export const ACTIONS_COLUMN = 'admin_actions',
    FROM_EXTENSION = '_from',
    TO_EXTENSION = '_to',
    ITEMS_PER_PAGE_FIELD = 'items_per_page',
    ASCENDING_ORDER = 'asc',
    DESCENDING_ORDER = 'desc',
    PAGE_FIELD = 'page',
    ORDER_FIELD = 'order',
    MIN_REFRESH_INTERVAL_MILLIS = 500,
    TABLE_ROW_HEIGHT = 40,
    COLUMNS_VISIBLE_IN_FULL_ROW = [ACTIONS_COLUMN, 'id', 'date_created'],
    ODD_ROW_COLOR = '#f2f2f2',
    EVEN_ROW_COLOR = '#ffffff',
    ITEMS_PER_PAGE = 'Items per page',
    ITEMS_PER_PAGE_OPTIONS = (): Array<Option> => [
        {value: 5, text: '5 ' + (!isXs() ? ITEMS_PER_PAGE : '')},
        {value: 10, text: '10 ' + (!isXs() ? ITEMS_PER_PAGE : '')},
        {value: 50, text: '50 ' + (!isXs() ? ITEMS_PER_PAGE : '')},
        {value: 500, text: '500 ' + (!isXs() ? ITEMS_PER_PAGE : '')},
        {value: 1 << 30, text: 'Show All'},
    ];

const styles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        // flexShrink: 0,
        // padding: appTheme.defaultMargin,
        [web]: {
            boxSizing: 'border-box',
        },
    },
    tableContainer: {
        width: '100%',
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
        maxHeight: {
            [web]: 'calc(100vh - 220px)',
            [all]: 360, // TODO: is this right?
        },
        [webDesktop]: {
            overflowX: 'auto',
        },
        [webMobile]: {
            overflowX: 'auto',
            '-webkit-overflow-scrolling': 'touch',
            '-webkit-transform': 'translateZ(0)',
        },
    },
    tableBody: {
        flexDirection: 'column',
        overflowX: 'hidden',
        [webDesktop]: {
            overflowY: 'overlay',
        },
        [webMobile]: {
            overflowY: 'auto',
            '-webkit-overflow-scrolling': 'touch',
            '-webkit-transform': 'translateZ(0)',
        },
    },
    tableOptions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableTitle: {
        fontSize: 32,
        fontWeight: '700',
        flexGrow: 0,
        flexShrink: 0,
        color: appTheme.textColor,
    },
    table: {
        flexDirection: 'column',
        width: '100%',
        position: 'absolute',
        [web]: {
            border: '1px solid #000000',
        },
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        top: 0,
        zIndex: 1,
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0,
        flexShrink: 0,
        minHeight: TABLE_ROW_HEIGHT,
        [web]: {
            borderTop: '1px solid #999',
        },
    },
    tableCell: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 180,
        [web]: {
            whiteSpace: 'normal',
            wordBreak: 'break-all',
        },
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginRight: appTheme.defaultMargin,
    },
    tableCellNormalWidth: {
        maxWidth: 180,
    },
    tableCellText: {
        [web]: {
            display: 'block !important',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        overflow: 'hidden',
        width: '100%',
        fontSize: 14,
    },
    tableCellHeader: {
        flexDirection: 'column',
    },
    tableHeaderDivider: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        marginBottom: -5,
        marginTop: -5,
    },
    optionsIconStyle: {
        [web]: {
            order: -1,
            color: appTheme.primaryColor,
        },
        [native]: {
            tintColor: appTheme.primaryColor,
        },
    },
    optionsTitleStyle: {
        color: appTheme.primaryColor,
    },
    optionsTouchableStyle: {
        alignItems: 'center',
        minWidth: {
            [webDesktop]: 125,
            [all]: 50,
        },
    },
    itemsPerPageSelect: {
        width: {
            [webDesktop]: 175,
            [all]: 50,
        },
        alignItems: 'center',
    },
    itemsPerPageLabel: {
        minWidth: 50,
        width: 50,
        alignSelf: 'center',
        margin: 'auto',
    },
    filtersClearButton: {
        maxWidth: 24,
        maxHeight: 24,
        minWidth: 0,
        minHeight: 0,
    },
});


class CTableComponent extends React.PureComponent<OwnProps & ConnectedProps & WithStyles & InjectedTranslateProps, {}> {
    tableDefinitionData: TableDefinitionData;
    rowStyle?: ( row: any ) => any;
    tableReloadTimeout: any;
    defaultVisibleColumns: Array<string>;
    private columns: Array<TableColumn>;
    static defaultProps = {
        paginate: true,
    };

    constructor( props: OwnProps & WithStyles & ConnectedProps & InjectedTranslateProps ) {
        super(props);
        let {tableDefinition, tableFilterPersistentData} = props;
        this.tableDefinitionData = tableDefinition;
        this.rowStyle = this.tableDefinitionData.rowStyle;
        this.columns = this.tableDefinitionData.columns(null)
            .filter(column => !!column) as Array<TableColumn>;

        this.defaultVisibleColumns = [
            ACTIONS_COLUMN,
            ...this.columns
                .filter(column => !column.hiddenInTable)
                .map(column => column.field)
        ];
        if (!tableFilterPersistentData || !tableFilterPersistentData.visibleColumns
            || tableFilterPersistentData.visibleColumns.length === 0) {
            this.changeTablePersistentData({visibleColumns: this.defaultVisibleColumns});
        }
        this.tableReloadTimeout = null;
    }

    componentDidMount() {
        let {tableData, tableFilterFormData, url} = this.props;

        if (tableData === null || tableData === undefined) {
            this.reloadTableData(tableFilterFormData, url || this.tableDefinitionData.url!, true);
        }
    }

    componentWillUnmount() {
        let {destroy, clearTableData, tableId, clearDataOnUnmount} = this.props;
        if (clearDataOnUnmount !== false) {
            destroy(getTableFormId(tableId));
            clearTableData(tableId);
        }
    }

    componentWillReceiveProps( nextProps: OwnProps & WithStyles & ConnectedProps ) {
        let {tableFilterFormData} = nextProps;

        if (!shallowEqual(tableFilterFormData, this.props.tableFilterFormData)) {
            this.reloadTableData(tableFilterFormData, nextProps.url || this.tableDefinitionData.url!, true);
        }

        if (nextProps.tableData && nextProps.tableData.data && nextProps.tableData.data.extra_data) {
            let {tableDefinition} = this.props;
            this.columns = tableDefinition.columns(nextProps.tableData.data.extra_data)
                .filter(column => !!column) as Array<TableColumn>;
            ;
        }
        if (!this.props.refreshTable && nextProps.refreshTable) {
            this.reloadTableData(tableFilterFormData, nextProps.url || this.tableDefinitionData.url!, true);
        }
    }

    changeTableFormData( newData: TableFormData ) {
        let {initialize, tableId, tableFilterFormData,} = this.props;

        initialize(
            getTableFormId(tableId),
            {
                ...(tableFilterFormData || {}),
                ...newData
            }
        );
    }

    changeTablePersistentData( newData: TableFormData ) {
        let {setPersistentTableOptions, tableId, tableFilterPersistentData,} = this.props;
        setPersistentTableOptions(getTableFormId(tableId), {...tableFilterPersistentData, ...newData});
    }

    reloadTableData( tableFilterFormData: TableFilterFormData, url: string, isFirst: boolean ) {
        let {tableId} = this.props;
        clearTimeout(this.tableReloadTimeout);

        if (url) {
            this.tableReloadTimeout = setTimeout(() => {
                let {loadTableData} = this.props;
                if (isFirst) {
                    if (url.indexOf('?') === -1) {
                        url += '?query=';
                    }
                    else {
                        if (url.indexOf('?') === url.length - 1) {
                            url += url + 'query=';
                        }
                        else {
                            url += '&query=';
                        }
                    }
                    url += encodeURIComponent(getFilterString(tableFilterFormData));
                    loadTableData(url, tableId);
                }
            }, MIN_REFRESH_INTERVAL_MILLIS);
        }
    }

    changeOrder( column: TableColumn ) {
        let {tableFilterFormData} = this.props;
        let newOrder = '';
        if (!tableFilterFormData || !tableFilterFormData.order
            || tableFilterFormData.order === column.field + '.' + DESCENDING_ORDER) {
            newOrder = column.field + '.' + ASCENDING_ORDER;
        } else if (tableFilterFormData.order === column.field + '.' + ASCENDING_ORDER) {
            newOrder = column.field + '.' + DESCENDING_ORDER;
        } else {
            newOrder = column.field + '.' + ASCENDING_ORDER;
        }
        this.changeTableFormData({order: newOrder});
    }

    getActionsColumn(): TableColumn | null {
        let {
            extraActions, t,
        } = this.props;
        let actions = extraActions || [];

        if (actions.length > 0 && this.defaultVisibleColumns.indexOf(ACTIONS_COLUMN) == -1) {
            this.defaultVisibleColumns.unshift(ACTIONS_COLUMN);
        } else if (actions.length === 0 && this.defaultVisibleColumns.indexOf(ACTIONS_COLUMN) != -1) {
            this.defaultVisibleColumns.shift();
        }

        return {
            field: ACTIONS_COLUMN,
            title: ACTIONS,
            type: FORM_INPUT_TYPES.TABLE_ACTIONS,
            notSortable: true,
            preferredWidth: 120,
            dataFormat: ( cell: any, row: Row ) => {
                // const itemName = `${t( title )} #${row.id}`;
                return (
                    <View style={{flexDirection: 'row'}}>
                        {/*<Button*/}
                        {/*icon={tableDetailsEntry && tableDetailsEntry.itemName === itemName ? iconList.radioChecked : iconList.radioUnchecked}*/}
                        {/*// touchableStyle={{ minWidth: 0, width: 48 }}*/}
                        {/*onPress={() => {*/}
                        {/*if (tableDetailsEntry && tableDetailsEntry.itemName === itemName) {*/}
                        {/*showEntryDetails( undefined, undefined );*/}
                        {/*return;*/}
                        {/*}*/}

                        {/*showEntryDetails(*/}
                        {/*this.columns.map( column => ( {*/}
                        {/*title: column.title || 'unknown',*/}
                        {/*value: getFormattedValue(*/}
                        {/*row,*/}
                        {/*column*/}
                        {/*),*/}
                        {/*} ) ),*/}
                        {/*itemName*/}
                        {/*);*/}
                        {/*if (isXs()) {*/}
                        {/*pushScreen(*/}
                        {/*navigation,*/}
                        {/*null,*/}
                        {/*routeDefinitions.TABLE_ENTRY_DETAILS,*/}
                        {/*null,*/}
                        {/*PUSH_TYPES.MODAL,*/}
                        {/*{},*/}
                        {/*{}*/}
                        {/*)*/}
                        {/*}*/}
                        {/*}}*/}
                        {/*/>*/}
                        {
                            actions.length > 0 &&
                            <PopoverComponent
                                actions={actions.map(action => ({
                                    ...action,
                                    onPress: () => action.onPress(row)
                                }))}
                            >
                                <Button
                                    title={t(ACTIONS)}
                                    // icon={iconList.build}
                                    // touchableStyle={{ minWidth: 0, width: 48 }}
                                />
                            </PopoverComponent>
                        }
                    </View>
                );
            }
        };
    }

    changeVisibleColumns( newColumns: Array<string> ) {
        let {tableFilterPersistentData, tableFilterFormData} = this.props,
            filtersToRemove: TableFormData = {},
            hasRemovableFilters: boolean = false;
        for (let column of tableFilterPersistentData.visibleColumns) {
            if (newColumns.indexOf(column) === -1) {
                for (let field of [column, column + FROM_EXTENSION, column + TO_EXTENSION]) {
                    if (!!tableFilterFormData[field]) {
                        filtersToRemove[field] = {dbValue: '', rawValue: ''};
                        hasRemovableFilters = true;
                    }
                }
            }
        }
        this.changeTablePersistentData({visibleColumns: newColumns});

        if (hasRemovableFilters) {
            this.changeTableFormData(filtersToRemove);
        }
    }

    getFilterComponentForColumn( column: TableColumn ) {
        let {tableFilterFormData} = this.props;

        if (column.type === FORM_INPUT_TYPES.TEXT) {
            let showClear = tableFilterFormData[column.field];
            return (
                <View>
                    {
                        showClear &&
                        <Button
                            // icon={iconList.cancel}
                            onPress={() =>
                                this.changeTableFormData({[column.field]: ''})
                            }
                            // touchableStyle={classes.filtersClearButton}
                        />
                    }
                    <FormItem
                        fieldDefinition={{
                            field: column.field,
                            placeholder: 'Filter',
                            type: FORM_INPUT_TYPES.TEXT,
                            inputType: TEXT_INPUT_TYPES.TEXT,
                        }}
                        input={{
                            onChange: ( newData: DBValue ) => this.changeTableFormData({
                                [column.field]: newData,
                                [PAGE_FIELD]: 1
                            }),
                            value: tableFilterFormData && tableFilterFormData[column.field]
                                ? tableFilterFormData[column.field]
                                : ''
                        }}
                    />
                </View>
            )
        }
        else if (column.type === FORM_INPUT_TYPES.DATE) {
            let fromField = column.field + FROM_EXTENSION,
                toField = column.field + TO_EXTENSION,
                showFromClear = tableFilterFormData[fromField],
                showToClear = tableFilterFormData[toField];
            return (
                <View>
                    <View style={{marginRight: 16,}}>
                        {
                            showFromClear &&
                            <Button
                                // icon={iconList.cancel}
                                onPress={() =>
                                    this.changeTableFormData({[fromField]: ''})
                                }
                                // touchableStyle={classes.filtersClearButton}
                            />
                        }
                        {/*<FormItem*/}
                            {/*fieldDefinition={{*/}
                                {/*type: FORM_INPUT_TYPES.DATE,*/}
                                {/*// mode: DATE_TIME_TYPE.DATE,*/}
                                {/*field: fromField,*/}
                                {/*placeholder: 'From',*/}
                            {/*}}*/}
                            {/*input={{*/}
                                {/*onChange: ( newData: DBValue ) => this.changeTableFormData({*/}
                                    {/*[fromField]: newData,*/}
                                    {/*[PAGE_FIELD]: 1*/}
                                {/*}),*/}
                                {/*value: tableFilterFormData && tableFilterFormData[fromField]*/}
                                    {/*? tableFilterFormData[fromField]*/}
                                    {/*: ''*/}
                            {/*}}*/}
                        {/*/>*/}
                    </View>
                    <View>
                        {
                            showToClear &&
                            <Button
                                // icon={iconList.cancel}
                                onPress={() =>
                                    this.changeTableFormData({[toField]: ''})
                                }
                                // touchableStyle={classes.filtersClearButton}
                            />
                        }
                        {/*<FormItem*/}
                            {/*fieldDefinition={{*/}
                                {/*type: FORM_INPUT_TYPES.DATE,*/}
                                {/*// mode: DATE_TIME_TYPE.DATE,*/}
                                {/*field: toField,*/}
                                {/*placeholder: 'To',*/}
                            {/*}}*/}
                            {/*input={{*/}
                                {/*onChange: ( newData: DBValue ) => this.changeTableFormData({*/}
                                    {/*[toField]: newData,*/}
                                    {/*[PAGE_FIELD]: 1*/}
                                {/*}),*/}
                                {/*value: tableFilterFormData && tableFilterFormData[toField]*/}
                                    {/*? tableFilterFormData[toField]*/}
                                    {/*: ''*/}
                            {/*}}*/}
                        {/*/>*/}
                    </View>
                </View>
            )
        } else return null;
    }

    getHeaderForColumn( column: TableColumn, sortOrder: string | undefined, allowFilters: boolean ) {
        let {classes, t} = this.props,
            widthStyle = !!column.preferredWidth
                ? {minWidth: column.preferredWidth, maxWidth: column.preferredWidth}
                : {};
        return (
            <View
                key={'header_' + column.title}
                style={[classes.tableCell, classes.tableCellNormalWidth, classes.tableCellHeader, widthStyle]}
            >
                <View style={classes.tableHeaderDivider}>
                    {
                        column.notSortable
                            ? <Text style={{width: '100%',}}>
                                {t(column.title || '')}
                            </Text>
                            : <Button
                                title={t(column.title || '')}
                                onPress={this.changeOrder.bind(this, column)}
                                primary={false}
                                raised={false}
                                // icon={
                                //     sortOrder && (
                                //         sortOrder === ASCENDING_ORDER
                                //             ? iconList.arrowUpBlack
                                //             : iconList.arrowDownBlack
                                //     )
                                // }
                                // style={{ alignItems: 'center', }}
                                // touchableStyle={{ minWidth: 0, width: '100%', }}
                                // iconStyle={{ right: 0, position: 'absolute', }}
                                // labelStyle={{ left: 0, position: 'absolute', }}
                            />
                    }
                </View>
                {allowFilters &&
                <View style={classes.tableHeaderDivider}>
                    {
                        this.getFilterComponentForColumn(column)
                    }
                </View>
                }
            </View>
        )
    }

    getTableRow( row: Row | undefined,
                 visibleTableColumns: Array<TableColumn>,
                 wrapRows: boolean,
                 fullRowColumnIndex: number,
                 rowIndex: number ) {
        let {classes,} = this.props,
            isFullRow = (
                fullRowColumnIndex != -1 &&
                this.columns[fullRowColumnIndex].fullRow &&
                this.columns[fullRowColumnIndex].fullRow!(row)
            );
        let fullRowValuePrinted = false;
        return (
            <View
                key={'cell_' + (row && row.id)}
                style={[
                    classes.tableRow,
                    wrapRows ? {flexWrap: 'wrap'} : {},
                    {backgroundColor: (rowIndex % 2 === 0 ? EVEN_ROW_COLOR : ODD_ROW_COLOR)},
                    this.rowStyle && this.rowStyle(row),
                ]}
            >
                {
                    visibleTableColumns.map(( column: TableColumn ) => {
                        let cellValue = getFormattedValue(
                            row,
                            column
                            ),
                            widthStyle = !!column.preferredWidth
                                ? {minWidth: column.preferredWidth, maxWidth: column.preferredWidth}
                                : {};
                        if (row) {
                            if (isFullRow && COLUMNS_VISIBLE_IN_FULL_ROW.indexOf(column.field) < 0) {
                                if (!fullRowValuePrinted) {
                                    cellValue = getFormattedValue(
                                        row,
                                        this.columns[fullRowColumnIndex]
                                    );
                                    fullRowValuePrinted = true;
                                } else {
                                    cellValue = '';
                                }
                            }
                            if (isFullRow && !cellValue) {
                                return null;
                            }
                            if (typeof cellValue !== 'object' || (cellValue && cellValue.constructor === Array)) {
                                return (
                                    <View
                                        key={'cell_' + column.field}
                                        style={[classes.tableCell, (!fullRowValuePrinted || !cellValue) && classes.tableCellNormalWidth, widthStyle]}
                                    >
                                        <Text style={classes.tableCellText}>
                                            {
                                                ((cellValue && cellValue.toString()) || '-')
                                            }
                                        </Text>
                                    </View>
                                )
                            }
                        }
                        return (
                            <View
                                key={'cell_' + column.field}
                                style={[classes.tableCell, (!fullRowValuePrinted || !cellValue) && classes.tableCellNormalWidth, widthStyle]}
                            >
                                {cellValue}
                            </View>
                        );
                    })
                }
            </View>
        );
    }

    render() {
        let {
                classes, title, tableFilterFormData, tableData, refreshMethod, tableActions,
                tableFilterPersistentData, url, mixRows, hideRefreshButton, paginate, t,
            } = this.props,
            tableDefinitionData = this.tableDefinitionData,
            actionsColumn = this.getActionsColumn(),
            columns = actionsColumn
                ? [actionsColumn, ...this.columns]
                : this.columns,
            tableColumns = columns.filter(
                ( column: TableColumn ) =>
                    !column.hiddenInTable
            ),
            tableItems = tableData && tableData.data && tableData.data.items,
            extraData = tableData && tableData.data && tableData.data.extra_data,
            wrapRows = tableFilterPersistentData && tableFilterPersistentData.wrapRows,
            // columnOptions = columns.map(
            //     column => {
            //         return {
            //             value: column.field,
            //             text: column.title!,
            //         };
            //     }
            // ),
            // visibleColumns = tableFilterPersistentData && tableFilterPersistentData.visibleColumns,
            // visibleTableColumns: Array<TableColumn> = !!visibleColumns && visibleColumns.length > 0
            //     ? tableColumns.filter(column => visibleColumns.indexOf(column.field) !== -1)
            //     : tableColumns,
            visibleTableColumns = tableColumns,
            [sortedColumn, sortedOrder] = tableFilterFormData && tableFilterFormData.order
            && tableFilterFormData.order.indexOf('.') > -1
                ? tableFilterFormData.order.split('.')
                : [null, null],
            allowFilters = tableDefinitionData.allowFilters;

        if (tableData && tableData.data && mixRows) {
            tableItems = mixRows(tableData.data);
        }

        let fullRowColumnIndex: number = -1;
        if (!!tableDefinitionData && !!tableItems) {
            for (let i in this.columns) {
                if (!!this.columns[i].fullRow) {
                    fullRowColumnIndex = parseInt(i);
                }
            }
        }

        if (tableData && tableData.data && mixRows) {
            tableItems = mixRows(tableData.data);
        }

        return (
            <View style={classes.container}>
                <Text style={classes.tableTitle}>
                    {title !== undefined ? title : tableDefinitionData.title}
                </Text>
                <TablePaginator
                    paginate={paginate}
                    totalItems={extraData && extraData.total_items}
                    onPaginateChange={( data: PaginatorData ) => {
                        this.changeTableFormData({
                            [ITEMS_PER_PAGE_FIELD]: data.itemsPerPage,
                            [PAGE_FIELD]: data.page,
                        });
                    }}
                >
                    <View style={classes.tableOptions}>
                        {
                            !hideRefreshButton &&
                            <Button
                                // icon={iconList.refresh}
                                title={isXs() ? undefined : t(REFRESH)}
                                // iconStyle={classes.optionsIconStyle}
                                // labelStyle={classes.optionsTitleStyle}
                                // touchableStyle={classes.optionsTouchableStyle}
                                // style={classes.optionsTouchableStyle}
                                onPress={
                                    !!refreshMethod
                                        ? refreshMethod.bind(this)
                                        : this.reloadTableData.bind(
                                        this,
                                        tableFilterFormData,
                                        url || this.tableDefinitionData.url,
                                        )
                                }
                            />
                        }
                        {isWeb &&
                        <Button
                            // icon={iconList.download}
                            title={t(EXPORT)}
                            // iconStyle={classes.optionsIconStyle}
                            // labelStyle={classes.optionsTitleStyle}
                            // touchableStyle={classes.optionsTouchableStyle}
                            // style={classes.optionsTouchableStyle}
                            onPress={
                                exportToCsv.bind(
                                    this,
                                    title + '_' + formatDate(MOMENT_FORMAT.L_LT, new Date()) + '.csv',
                                    this.columns,
                                    tableData,
                                )
                            }
                        />
                        }
                        {/*<MultipleSelect*/}
                        {/*title={isXs() ? undefined : _t( COLUMNS )}*/}
                        {/*isButton={true}*/}
                        {/*buttonProps={{*/}
                        {/*icon: iconList.columns,*/}
                        {/*iconStyle: classes.optionsIconStyle,*/}
                        {/*labelStyle: classes.optionsTitleStyle,*/}
                        {/*touchableStyle: classes.optionsTouchableStyle,*/}
                        {/*style: classes.optionsTouchableStyle,*/}
                        {/*}}*/}
                        {/*options={columnOptions}*/}
                        {/*onChange={( newColumns: Array<string> ) => {*/}
                        {/*this.changeVisibleColumns( newColumns );*/}
                        {/*}}*/}
                        {/*value={visibleColumns}*/}
                        {/*navigation={navigation}*/}
                        {/*/>*/}
                        <Button
                            // icon={iconList.wrap}
                            title={isXs() ? undefined : 'wrap rows'}
                            // iconStyle={classes.optionsIconStyle}
                            // labelStyle={classes.optionsTitleStyle}
                            // touchableStyle={classes.optionsTouchableStyle}
                            // style={classes.optionsTouchableStyle}
                            onPress={this.changeTablePersistentData.bind(this, {wrapRows: !wrapRows})}
                        />
                        {
                            (tableActions || []).map(action => (
                                <Button
                                    iconLeft={isXs() ? action.iconXs : action.icon}
                                    title={isXs() ? t(action.titleXs || '') : t(action.title || '')}
                                    // iconStyle={classes.optionsIconStyle}
                                    // labelStyle={classes.optionsTitleStyle}
                                    // touchableStyle={classes.optionsTouchableStyle}
                                    // style={classes.optionsTouchableStyle}
                                    onPress={action.onPress}
                                />
                            ))
                        }
                        {/*{loadingData && <CircularProgressComponent/>}*/}
                    </View>
                    <ScrollView
                        style={classes.tableContainer}
                        // horizontal={true}
                        // vertical={false}
                    >
                        <View style={classes.table}>
                            <View style={[
                                classes.tableRow,
                                classes.tableHeader,
                                wrapRows ? {flexWrap: 'wrap'} : {}
                            ]}>
                                {
                                    visibleTableColumns.map(( column: TableColumn ) =>
                                        this.getHeaderForColumn(
                                            column,
                                            sortedColumn === column.field
                                                ? sortedOrder!
                                                : undefined,
                                            allowFilters
                                        )
                                    )
                                }
                            </View>
                            {
                                <ScrollView
                                    style={classes.tableBody}
                                    // horizontal={false}
                                    // vertical={true}
                                >
                                    {
                                        tableItems
                                            ? tableItems.map(( tableItem: Row, index: number ) =>
                                                this.getTableRow(
                                                    tableItem,
                                                    visibleTableColumns,
                                                    wrapRows,
                                                    fullRowColumnIndex,
                                                    index
                                                )
                                            )
                                            : this.getTableRow(
                                            undefined,
                                            visibleTableColumns,
                                            wrapRows,
                                            fullRowColumnIndex,
                                            0
                                            )
                                    }
                                </ScrollView>
                            }
                        </View>

                    </ScrollView>
                </TablePaginator>

            </View>
        );
    }
}

const componentName = 'TableComponent';
export const TableComponent = compose(
    translate(),
    connect(
        ( state: any, ownProps: OwnProps ) => {
            let tableId: string = ownProps.tableContainerName !== null && ownProps.tableContainerName !== undefined
                ? ownProps.tableContainerName + '_' + ownProps.tableDefinition.dataName
                : ownProps.tableDefinition.dataName;
            return {
                loadingData: getNestedField(state.table, [tableId, 'loading']),
                openedTableRow: getNestedField(state.table, [tableId, 'menuRow']),
                refreshTable: getNestedField(state.table, [tableId, 'refresh']),
                tableData: ownProps.tableData || state.table[tableId],
                tableFilterFormData: getNestedField(state.form, [getTableFormId(tableId), 'values']) || {},
                tableFilterPersistentData: state.persistedTableOptions[getTableFormId(tableId)],
                tableId: tableId,
                // tableDetailsEntry: state.table[TABLE_PAGES_ENUM.TABLE_NETRY_DETAILS],
            }
        }, {
            destroy,
            clearTableData,
            initialize,
            loadTableData,
            // pushScreen,
            setPersistentTableOptions,
            setRefreshTable,
            showMenu,
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

export function getTableFormId( tableId: string ): string {
    return tableId + '_TABLE_FORM';
}
