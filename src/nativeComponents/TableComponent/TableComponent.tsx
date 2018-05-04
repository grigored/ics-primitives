import * as React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { View } from "../../primitives/View/View";
import {TableInner} from "./TableInner";
import {ConnectedProps, OwnProps, Row, TableColumn, TableRowAction} from "./TableComponent.types";
import {appTheme, Button, createStyles, FORM_INPUT_TYPES, WithStyles} from "../../index";
import {InjectedTranslateProps, translate} from "react-i18next";
import {loadTableData, showEntryDetails} from "../../redux/reducers/table";
import {getNestedField} from "../../utils/common";
import {setPersistentTableOptions} from "../../redux/reducers/persistedTableOptions";
import {TableTopActions} from "./TableTopActions";
import {ACTIONS} from "../../utils/strings";
import {PopoverComponent} from "../PopoverComponent/PopoverComponent";
import {TranslationFunction} from "i18next";

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

const ACTIONS_COLUMN = 'admin_actions';

const getActionsColumn = (actions: Array<TableRowAction>, t: TranslationFunction): TableColumn => {
    return {
        field: ACTIONS_COLUMN,
        title: ACTIONS,
        type: FORM_INPUT_TYPES.TABLE_ACTIONS,
        notSortable: true,
        preferredWidth: 120,
        dataFormat: ( cell: any, row: Row ) => {
            return (
                <View style={{flexDirection: 'row'}}>
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
                            />
                        </PopoverComponent>
                    }
                </View>
            );
        }
    };
};

class CTableComponent extends React.PureComponent<OwnProps & ConnectedProps & WithStyles & InjectedTranslateProps, {}> {

    componentDidMount() {
        let {loadTableData, tableDefinition: {url}, tableId} = this.props;
        url && loadTableData(url, tableId);
    }

    render() {
        let { classes, extraActions, loadingData, t, tableDefinition, tableData, tableId } = this.props,
            columns = tableDefinition.columns(undefined);

        if (!!extraActions) {
            columns = [getActionsColumn(extraActions, t), ...columns];
        }

        return (
            <View style={classes.container}>

                <View style={classes.title}>
                    {tableDefinition.title}
                </View>

                <TableTopActions
                    columns={columns}
                    refreshMethod={
                        !!tableDefinition.url
                            ? () => loadTableData(tableDefinition.url!, tableId)
                            : undefined
                    }
                    loadingData={loadingData}
                    tableData={tableData}
                    title={tableDefinition.title}
                />

                <TableInner
                    columns={columns}
                    tableData={tableData && tableData.data}
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
