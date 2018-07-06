import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { compose } from 'redux';
import { TextInput } from "../../nativeComponents/TextInput/TextInput";
import {
    createStyles, FORM_INPUT_TYPES, ScrollView, Text, TEXT_INPUT_TYPES, View, web, WithStyles,
} from "../..";
import { Data, TableColumn } from "./TableComponent.types";
import { NO_TABLE_DATA } from "../../utils/strings";

const styles = () => ( {
    containerVertical: {
        [web]: {
            flex: 1,
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            overflow: 'scroll',
            width: '100%',
        },
    },
    innerView: {
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
        alignItems: 'center',
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
    columns: Array<TableColumn>,
    tableData?: Data
    loadTableData: Function,
    allowFilters: boolean
}

type Props = OwnProps & WithStyles & InjectedTranslateProps

const DEFAULT_CELL_WIDTH = 120,
    FILTER_DELAY_MS = 333;

class CTableInner extends React.PureComponent<Props, {}> {

    _filters: { [field: string]: string } = {};
    _filtersTimeout: any = null;
    _bindedFiltersOnChange: { [field: string]: Function } = {};

    constructor( props: Props ) {
        super( props );
        props.columns.forEach( ( column: TableColumn ) => {
            this._bindedFiltersOnChange[column.field] = this.setFilter.bind( this, column.field );
        } )
    }

    getFilterForColumn( column: TableColumn ) {
        let { classes } = this.props;
        switch (column.type) {
            case FORM_INPUT_TYPES.TEXT:
                return (
                    <TextInput
                        {...column}
                        title={''}
                        onChange={this._bindedFiltersOnChange[column.field]}
                        inputType={TEXT_INPUT_TYPES.TEXT}
                        inputStyle={{
                            input: classes.filters,
                        }}
                        value={this._filters[column.field] || ''}
                    />
                );
        }
        return null
    }

    hasFilters(): boolean {
        for (let key in this._filters) {
            if (this._filters.hasOwnProperty( key ) && this._filters[key] !== '') {
                return true;
            }
        }
        return false;
    }

    getFiltersObject() {
        let filters: Array<any> = [],
            page = 0,
            itemsPerPage = 100;
        for (let key in this._filters) {
            if (this._filters.hasOwnProperty( key )) {
                filters.push( { column: key, value: this._filters[key], operator: '~' } );
            }
        }
        return {
            filters,
            page,
            itemsPerPage,
        };
    }

    setFilter( field: string, value: string ) {
        if (!value) {
            delete( this._filters[field] );
        } else {
            this._filters[field] = value;
        }
        clearTimeout( this._filtersTimeout );
        this._filtersTimeout = setTimeout( () => {
            this.props.loadTableData(
                this.hasFilters()
                    ? this.getFiltersObject()
                    : null );
        }, FILTER_DELAY_MS );
    }

    render() {
        const { classes, columns, tableData, t, allowFilters } = this.props;
        return (
            <ScrollView style={classes.containerVertical}>
                <ScrollView horizontal={true}>
                    <View style={classes.innerView}>
                        <View
                            style={[
                                classes.th,
                                {
                                    flexDirection: 'row',
                                    height: allowFilters ? 80 : 40
                                },
                            ]}
                        >
                            {
                                columns.map( column => (
                                    <View
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
                                            allowFilters &&
                                            <View
                                                style={[
                                                    classes.title,
                                                ]}
                                            >
                                                {
                                                    this.getFilterForColumn( column )
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
                                    tableData.items.slice( 0, 20 ).map( ( row, index ) => (
                                        <View key={row.id || index} style={classes.tr}>
                                            {columns.map( column => {
                                                    let value = !column.dataFormat
                                                        ? row[column.field]
                                                        : column.dataFormat( row[column.field], row );
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
