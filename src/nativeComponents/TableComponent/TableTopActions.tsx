import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { compose } from "redux";
import { Button, createStyles, isXs, View, WithStyles } from "../../index";
import { isWeb } from "../../primitives/platform/platform";
import { MOMENT_FORMAT } from "../../utils/enums";
import { formatDate } from "../../utils/i18n";
import { EXPORT, REFRESH } from "../../utils/strings";
import { TableColumn, TableData, TableRowAction } from "./TableComponent.types";
import { exportToCsv } from "./tableExport";

const styles = {
    tableOptions: {
        justifyContent: 'space-between',
        flexShrink: 0,
        flexDirection: 'row',
    },
    buttonLeft: {
        paddingTop: 8,
        paddingRight: 15,
        paddingBottom: 8,
        paddingLeft: 0
    },
    buttonRight: {
        paddingTop: 8,
        paddingRight: 1,
        paddingBottom: 8,
        paddingLeft: 15
    },
    iconRight: {
        width: 18,
        height: 18
    }
};

export interface OwnProps {
    columns: Array<TableColumn>,
    refreshMethod?: () => void,
    tableActions?: Array<TableRowAction>,
    tableData?: TableData,
    title: string,
    hideRefreshButton?: boolean,
    hideExportButton?: boolean,
}

class CTableTopActions extends React.PureComponent<OwnProps & InjectedTranslateProps & WithStyles, {}> {
    render() {
        const {
            classes, columns, refreshMethod, t, tableActions, tableData, title, hideExportButton,
            hideRefreshButton,
        } = this.props;
        return (
            <View style={classes.tableOptions}>
                {
                    !!refreshMethod && !hideRefreshButton &&
                    <Button
                        title={t( REFRESH )}
                        onPress={!!refreshMethod && refreshMethod}
                        styles={{ root: styles.buttonLeft, iconRight: classes.iconRight }}
                    />
                }
                {
                    isWeb && !hideExportButton &&
                    <Button
                        title={t( EXPORT )}
                        onPress={
                            exportToCsv.bind(
                                this,
                                title + '_' + formatDate( MOMENT_FORMAT.L_LT, new Date() ) + '.csv',
                                columns,
                                tableData,
                            )
                        }
                    />
                }

                {
                    ( tableActions || [] ).map( action => (
                        <Button
                            key={title + '_table_button_' + action.title}
                            iconLeft={isXs() ? action.iconXs : action.icon}
                            title={isXs() ? ( action.titleXs || '' ) : ( action.title || '' )}
                            styles={{ root: styles.buttonRight }}
                            // iconStyle={classes.optionsIconStyle}
                            // labelStyle={classes.optionsTitleStyle}
                            // touchableStyle={classes.optionsTouchableStyle}
                            // style={classes.optionsTouchableStyle}
                            onPress={action.onPress}
                        />
                    ) )
                }
            </View> );
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

