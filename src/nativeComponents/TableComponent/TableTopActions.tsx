import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import {formatDate} from "../../utils/i18n";
import {EXPORT, REFRESH} from "../../utils/strings";
import {Button, CircularProgressComponent, createStyles, isXs, View, WithStyles} from "../../index";
import {isWeb} from "../../primitives/platform/platform";
import {MOMENT_FORMAT} from "../../utils/enums";
import {exportToCsv} from "./tableExport";
import {compose} from "redux";
import {TableColumn, TableData, TableRowAction} from "./TableComponent.types";

const styles = {
    tableOptions: {
        flexShrink: 0,
    }
};

export interface OwnProps {
    columns: Array<TableColumn>,
    loadingData: boolean,
    refreshMethod?: () => void,
    tableActions?: Array<TableRowAction>,
    tableData?: TableData,
    title: string,

}

class CTableTopActions extends React.PureComponent<OwnProps & InjectedTranslateProps & WithStyles, {}> {
    render() {
        const { classes, columns, loadingData, refreshMethod, t, tableActions, tableData, title } = this.props;
        return (
            <View style={classes.tableOptions}>
            {
                !!refreshMethod &&
                <Button
                    title={t(REFRESH)}
                    onPress={!!refreshMethod && refreshMethod}
                />
            }
            {
                isWeb &&
                <Button
                    title={t(EXPORT)}
                    onPress={
                        exportToCsv.bind(
                            this,
                            title + '_' + formatDate(MOMENT_FORMAT.L_LT, new Date()) + '.csv',
                            columns,
                            tableData,
                        )
                    }
                />
            }
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
            {loadingData && <CircularProgressComponent/>}
        </View>);
    }
}


export const TableTopActions = compose(
    translate(),
    createStyles(
        styles,
        'TableTopActions'
    ),
)(
    CTableTopActions
) as React.ComponentType<OwnProps>;

