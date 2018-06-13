import * as React from 'react';
import {InjectedTranslateProps, translate} from 'react-i18next';
import {compose} from 'redux';
import {createStyles, ScrollView, Text, View, web, WithStyles} from "../..";
import {Data, TableColumn} from "./TableComponent.types";
import {NO_TABLE_DATA} from "../../utils/strings";

const styles = () => ({
    container: {
        width: '100%',
        overflow: 'scroll',
    },
    th: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        [web]: {
            borderBottomStyle: 'solid'
        },
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
    },
    trasd: {
        [web]: {
            borderBottomStyle: 'solid',
            '&:hover': {
                backgroundColor: '#eee',
            },
        },
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
    },
    noData: {
        width: '100%',
        height: 40,
        padding: 8,
        [web]: {
            boxSizing: 'border-box',
        },
    },

});

export interface OwnProps {
    columns: Array<TableColumn>,
    tableData?: Data
}

type Props = OwnProps & WithStyles & InjectedTranslateProps

const DEFAULT_CELL_WIDTH = 150;

class CTableInner extends React.PureComponent<Props, {}> {
    render() {
        const {classes, columns, tableData, t} = this.props;
        return (
            <ScrollView contentContainerStyle={{height: 1000}}>
                <ScrollView horizontal={true} contentContainerStyle={{width: 1000}} style={classes.container}>
                    <View style={{flexDirection: 'column', backgroundColor: '#fff'}}>
                        <View style={classes.th}>
                            {columns.map(column => (
                                <Text
                                    key={column.field}
                                    style={[
                                        classes.thtd,
                                        { width: column.preferredWidth || DEFAULT_CELL_WIDTH }
                                    ]}
                                >
                                    {t(column.title || '')}
                                </Text>
                            ))}
                        </View>
                        {!tableData
                            ? (
                                <View style={[classes.noData, classes.th]}>
                                    <Text>
                                        {t(NO_TABLE_DATA)}
                                    </Text>
                                </View>
                            ) : (
                                tableData.items.map((row, index) => (
                                    <View key={row.id || index} style={classes.trasd}>
                                        {columns.map(column => (
                                            <Text key={column.field} style={classes.thtd}>
                                                {row[column.field]}
                                            </Text>
                                        ))}

                                    </View>
                                ))
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
)(CTableInner as React.ComponentType<OwnProps>;
