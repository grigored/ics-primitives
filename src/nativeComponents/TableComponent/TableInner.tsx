import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { View } from "../../primitives/View/View";
import { Text } from "../../primitives/Text/Text";
import { Data, TableColumn } from "./TableComponent.types";
import { compose } from "redux";
import { createStyles, ScrollView, web, WithStyles } from "../../index";
import { NO_TABLE_DATA } from "../../utils/strings";

const styles = {
    horizontalScrollable: {
        borderWidth: 1,
        borderColor: '#999',
        borderStyle: 'solid',
        flexDirection: 'column',
        [web]: {
            overflowX: 'scroll',
            overflowY: 'hidden',
        }
    },
    header: {
        flexBasis: 50,
        [web]: {
            flexAlign: 'center',
            textTransform: 'uppercase',
        },
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderStyle: 'solid',
        fontWeight: '500',
        backgroundColor: '#eee',
    },
    row: {
        flexDirection: 'row',
        flexShrink: 0,
    },
    evenRow: {
        backgroundColor: '#efefef',
    },
    oddRow: {
        backgroundColor: '#fff',
    },
    body: {
        [web]: {
            overflowX: 'visible', /* so that the body is scrollable horizontally, and scrolls together with header in right-scrollable */
            overflowY: 'scroll',
        },
        flexDirection: 'column',
        flexGrow: 1,
    },
    bodyRow: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        height: 34,
    },
    cell: {
        [web]: {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        },
        overflow: 'hidden',
        padding: 7,
    },
    noData: {
        margin: 'auto'
    }
};

export interface Props {
    columns: Array<TableColumn>,
    tableData?: Data
}

const DEFAULT_CELL_WIDTH = 200;

class CTableInner extends React.PureComponent<Props & WithStyles & InjectedTranslateProps, {}> {
    render() {
        const { classes, columns, tableData, t } = this.props,
            totalWidth = columns.reduce(
                ( prevSum, current ) => prevSum + ( current.preferredWidth || DEFAULT_CELL_WIDTH ),
                0
            );
        return (
            <ScrollView
                style={classes.horizontalScrollable}
                horizontal={true} // todo here
            >
                <View
                    name="header"
                    style={[
                        classes.header,
                        classes.row,
                        { width: totalWidth }
                    ]}
                >
                    {columns.map( column => (
                        <Text
                            key={column.field}
                            style={[
                                classes.cell,
                                { width: column.preferredWidth || DEFAULT_CELL_WIDTH }
                            ]}
                        >
                            {t( column.title || "" )}
                        </Text>
                    ) )}
                </View>
                <ScrollView
                    style={[
                        classes.body,
                        { width: totalWidth }
                    ]}
                    horizontal={true} // todo also here
                >
                    {
                        !tableData
                            ? (
                                <View style={classes.noData}>
                                    <Text>
                                        {t( NO_TABLE_DATA )}
                                    </Text>
                                </View>
                            ) : (
                                tableData.items.map( ( row, index ) => (
                                    <View key={index} style={[classes.row, classes.bodyRow]}>
                                        {columns.map( column => (
                                            <View
                                                key={column.field}
                                                style={[
                                                    index % 2 === 0 ? classes.evenRow : classes.oddRow,
                                                    { width: column.preferredWidth || DEFAULT_CELL_WIDTH }
                                                ]}
                                            >
                                                {column.dataFormat
                                                    ? column.dataFormat( row[column.field], row )
                                                    : <Text style={classes.cell}>
                                                        {row[column.field] || "-"}
                                                    </Text>
                                                }
                                            </View>
                                        ) )}
                                    </View>
                                ) )
                            )
                    }
                </ScrollView>
            </ScrollView>
        );
    }
}

export const TableInner = compose(
    translate(),
    createStyles(
        styles,
        'TableInner'
    ),
)(
    CTableInner
) as React.ComponentType<Props>;
