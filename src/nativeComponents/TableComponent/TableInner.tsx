import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { View } from "../../primitives/View/View";
import {Text} from "../../primitives/Text/Text";
import {Data, TableColumn} from "./TableComponent.types";
import {compose} from "redux";
import {createStyles, WithStyles} from "../../index";
import {NO_TABLE_DATA} from "../../utils/strings";

const styles = {
    horizontalScrollable: {
        borderWidth: 1,
        borderColor: '#999',
        borderStyle: 'solid',
        flexDirection: 'column',
        overflowX: 'scroll',
        overflowY: 'hidden',
    },
    header: {
        flexBasis: 50,
        flexAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        fontWeight: 500,
        backgroundColor: '#eee',
        textTransform: 'uppercase',
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
        overflowX: 'visible', /* so that the body is scrollable horizontally, and scrolls together with header in right-scrollable */
        overflowY: 'scroll',
        flexDirection: 'column',
        flexGrow: 1,
    },
    bodyRow: {
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        height: 30,
    },
    cell: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        padding: 5,
    },
    noData: {
        margin: 'auto'
    }
};

export interface Props {
    columns: Array<TableColumn>,
    data?: Data
}

const DEFAULT_CELL_WIDTH = 200;

class CTableInner extends React.PureComponent<Props & WithStyles & InjectedTranslateProps, {}> {
    render() {
        const { classes, columns, data, t } = this.props;
        return (
            <View style={classes.horizontalScrollable} >
                <View
                    name="header"
                    style={[
                        classes.header,
                        classes.row,
                        {width: columns.length * DEFAULT_CELL_WIDTH}
                    ]}
                >
                    {columns.map(column => (
                        <Text key={column.field} style={[classes.cell, {width: DEFAULT_CELL_WIDTH}]}>
                            {t(column.title || "")}
                        </Text>
                    ))}
                </View>

                <View
                    name="body"
                    style={[
                        classes.body,
                        {width: columns.length * DEFAULT_CELL_WIDTH}
                    ]}
                >
                    {
                        !data
                            ? (
                                <View style={classes.noData}>
                                    {t(NO_TABLE_DATA)}
                                </View>
                            ) : (
                                data.items.map((row, index)=> (
                                    <View key={index} style={[classes.row, classes.bodyRow]}>
                                        {columns.map(column => (
                                            <Text
                                                key={column.field}
                                                style={[
                                                    classes.cell,
                                                    index % 2 === 0 ? classes.evenRow: classes.oddRow,
                                                    {width: DEFAULT_CELL_WIDTH}
                                                ]}
                                            >
                                                {row[column.field]}
                                            </Text>
                                        ))}
                                    </View>
                                ))
                            )
                    }

                </View>
            </View>
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
