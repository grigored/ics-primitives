import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { compose } from 'redux';
import { all, createStyles, ScrollView, Text, View, web, webDesktop, WithStyles, } from "../..";
import { NO_TABLE_DATA } from "../../utils/strings";
import { getFilterForColumn, getFilterValue } from "./TableComponent";
import { Data, TableColumn, TableDefinitionData, TableFiltersData } from "./TableComponent.types";
import { getValue } from "./tableUtils";

const styles = () => ( {
    containerVertical: {
        [web]: {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            overflow: 'auto',
            width: '100%',
        },
        [all]: {
            flexGrow: 1,
        },
        flexShrink: 0,
        maxHeight: {
            [webDesktop]: '75%',
            [all]: '85%',
        },
    },
    innerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    th: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexShrink: 0,
        [web]: {
            borderBottomStyle: 'solid'
        },
        fontSize: 12,
        color: '#777',
    },
    thtd: {
        [web]: {
            boxSizing: 'border-box',
        },
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 8,
        height: 40,
        overflow: 'hidden',
    },
    tr: {
        [web]: {
            borderBottomStyle: 'solid',
            '&:hover': {
                backgroundColor: '#eee',
            },
        },
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        flexShrink: 0,
        fontSize: 14
    },
    noData: {
        width: '100%',
        height: 40,
        padding: 8,
        [web]: {
            boxSizing: 'border-box',
        },
    },
    title: {
        height: 40,
    },
    filters: {
        width: '100%',
    }
} );

export interface OwnProps {
    tableDefinition: TableDefinitionData,
    columns: Array<TableColumn>,
    tableData?: Data
    showFilters: boolean,
    filtersData: TableFiltersData,
}

type Props = OwnProps & WithStyles & InjectedTranslateProps

const DEFAULT_CELL_WIDTH = 120;

class CTableInner extends React.PureComponent<Props, {}> {

    render() {
        const { classes, columns, tableData, t, showFilters, filtersData, tableDefinition } = this.props;
        return (
            <ScrollView style={classes.containerVertical}>
                <ScrollView horizontal={true}>
                    <View style={classes.innerView}>
                        <View
                            style={[
                                classes.th,
                                {
                                    flexDirection: 'row',
                                    height: showFilters ? 80 : 40
                                },
                            ]}
                        >
                            {
                                columns.map( ( column: TableColumn ) => (
                                    <View
                                        key={'table_' + tableDefinition.title + '_column_' + column.field}
                                        style={[
                                            classes.thtd,
                                            {
                                                width: column.preferredWidth || DEFAULT_CELL_WIDTH,
                                                flexDirection: 'column',
                                                height: '100%',
                                            }
                                        ]}
                                    >
                                        <Text
                                            key={column.field}
                                            style={classes.title}
                                        >
                                            {t( column.title || '' )}
                                        </Text>
                                        {
                                            showFilters && column.hasFilter &&
                                            <View
                                                style={[
                                                    classes.title,
                                                ]}
                                            >
                                                {
                                                    getFilterForColumn(
                                                        column,
                                                        { input: classes.filters },
                                                        filtersData.bindedFiltersOnChange[column.field],
                                                        getFilterValue( column, filtersData.filters[column.field] ),
                                                        t,
                                                    )
                                                }
                                            </View>
                                        }
                                    </View>
                                ) )
                            }
                        </View>
                        {
                            !tableData
                                ? (
                                    <View style={[classes.noData, classes.th]}>
                                        <Text>
                                            {t( NO_TABLE_DATA )}
                                        </Text>
                                    </View>
                                ) : (
                                    tableData.items.map( ( row, index ) => (
                                        <View key={row.id || index} style={classes.tr}>
                                            {columns.map( column => {
                                                    let value = getValue( column, row );
                                                    return (
                                                        <View
                                                            key={column.field}
                                                            style={[
                                                                classes.thtd,
                                                                { width: column.preferredWidth || DEFAULT_CELL_WIDTH }
                                                            ]}
                                                        >
                                                            {
                                                                typeof value !== 'object' // in case this is JSX
                                                                    ? <Text>{value}</Text>
                                                                    : value
                                                            }

                                                        </View>
                                                    )
                                                }
                                            )}

                                        </View>
                                    ) )
                                )
                        }
                    </View>
                </ScrollView>
            </ScrollView>
        )
    }
}

export const TableInner = compose(
    translate(),
    createStyles(
        styles,
        'TableInner'
    )
)( CTableInner ) as React.ComponentType<OwnProps>;
