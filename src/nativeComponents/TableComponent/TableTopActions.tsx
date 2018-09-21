import * as React from 'react';
import { InjectedTranslateProps, translate } from 'react-i18next';
import { CIRCULAR_PROGRESS_SIZE } from "../../utils/enums";
import { formatDate } from "../../utils/i18n";
import { EXPORT, REFRESH } from "../../utils/strings";
import { Button, CircularProgressComponent, createStyles, isXs, View, WithStyles } from "../../index";
import { isWeb } from "../../primitives/platform/platform";
import { MOMENT_FORMAT } from "../../utils/enums";
import { exportToCsv } from "./tableExport";
import { compose } from "redux";
import { TableColumn, TableData, TableRowAction } from "./TableComponent.types";

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
    loadingData?: boolean,
}

class CTableTopActions extends React.PureComponent<OwnProps & InjectedTranslateProps & WithStyles, {}> {
    render() {
        const { classes, columns, refreshMethod, t, tableActions, tableData, title, loadingData } = this.props;
        return (
            <View style={classes.tableOptions}>
                <View>
                    {
                        !!refreshMethod &&
                        <Button                            
                            title={t( REFRESH )}
                            onPress={!!refreshMethod && refreshMethod}
                            styles={{root: styles.buttonLeft, iconRight: classes.iconRight}}
                        />
                    }
                    {
                        isWeb &&
                        <Button                            
                            title={t( EXPORT )}
                            styles={{root: styles.buttonLeft, iconRight: classes.iconRight}}
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
                </View>
                {
                    ( tableActions || [] ).map( action => (
                        <Button
                            iconLeft={isXs() ? action.iconXs : action.icon}
                            title={isXs() ? t( action.titleXs || '' ) : t( action.title || '' )}
                            styles={{root: styles.buttonRight}}
                            // iconStyle={classes.optionsIconStyle}
                            // labelStyle={classes.optionsTitleStyle}
                            // touchableStyle={classes.optionsTouchableStyle}
                            // style={classes.optionsTouchableStyle}
                            onPress={action.onPress}
                        />
                    ) )
                }

                {loadingData && <CircularProgressComponent size={CIRCULAR_PROGRESS_SIZE.SMALL}/>}
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

