import * as React from 'react';
import { View } from "../../primitives/View/View";
import {TableInner} from "./TableInner";
import {ConnectedProps, OwnProps} from "./TableComponent.types";
import {appTheme, createStyles, WithStyles} from "../../index";
import {InjectedTranslateProps, translate} from "react-i18next";
import {loadTableData, showEntryDetails} from "../../redux/reducers/table";
import {getNestedField} from "../../utils/common";
import {connect} from "react-redux";
import {compose} from "redux";
import {setPersistentTableOptions} from "../../redux/reducers/persistedTableOptions";

const styles = {
    container: {
        maxWidth: '100%',
        flexDirection: 'column',
    },
    title: {
        flexShrink: 0,
        fontSize: appTheme.fontSizeXL,
    }
};

class CTableComponent extends React.PureComponent<OwnProps & ConnectedProps & WithStyles & InjectedTranslateProps, {}> {
    render() {
        const { classes, tableDefinition, tableData } = this.props;
        return (
            <View style={classes.container}>
                <View style={classes.title}>
                    {tableDefinition.title}
                </View>
                <TableInner
                    columns={tableDefinition.columns(undefined)}
                    data={tableData.data}
                />
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
                loadingData: getNestedField(state.table, [tableId, 'loading']),
                openedTableRow: getNestedField(state.table, [tableId, 'menuRow']),
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
