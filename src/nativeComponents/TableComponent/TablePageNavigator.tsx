import * as React from 'react';
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { TABLE_PAGE_COUNTER, ITEMS_PER_PAGE } from "../../utils/strings";
import {
    android, appTheme, Button, createStyles, ios, isXs, Select, Text, View,
    WithStyles
} from '../../';


const styles = () => ( {
    container: {
        marginTop: appTheme.defaultVerticalMargin,
        marginBottom: appTheme.defaultVerticalMargin,
        height: 24,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    initialTextStyle: {
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        minWidth: 32,
        alignItems: 'center',
        justifyContent: 'center',
        height: 24,
    },
    buttonsTouchableStyle: {
        minWidth: 0,
    },
    iconStyle: {
        marginLeft: 0,
        marginRight: 0,
        [ios]: {
            tintColor: null,
        },
        [android]: {
            tintColor: null,
        },
    },
    itemsPerPageContainer: {
        width: 128,
        minWidth: 128,
        flex: 0,
    }
} );

export interface OwnProps {
    style?: any,
    itemsCount: number,
    itemsLowerLimit: number,
    itemsUpperLimit: number,
    currentPage: number,
    pagesCount: number,
    changePage: ( page: number ) => void,
    jumpToFirstIcon?: any,
    jumpToLastIcon?: any,
    itemsPerPageValue?: number,
    itemsPerPageOptions?: Array<number>,
    changeItemsPerPage?: ( itemsPerPage: number ) => void,
}

export type Props = OwnProps & InjectedTranslateProps

class CTablePageNavigator extends React.PureComponent<Props & WithStyles, {}> {

    render() {
        let {
            classes, style, itemsCount, itemsLowerLimit, itemsUpperLimit, currentPage, pagesCount, changePage,
            jumpToFirstIcon, jumpToLastIcon, t, itemsPerPageValue, itemsPerPageOptions, changeItemsPerPage,
        } = this.props;
        return (
            <View style={[classes.container, style || {}]}>
                {
                    !!itemsPerPageValue &&!!itemsPerPageOptions && !!changeItemsPerPage &&
                        <View style={classes.itemsPerPageContainer}>
                    <Select
                        title={t( ITEMS_PER_PAGE )}
                        value={itemsPerPageValue}
                        options={itemsPerPageOptions.map( ( value: number ) => ( {
                            text: value.toString(),
                            value,
                        } ) )}
                        onChange={( value: number ) => changeItemsPerPage!( value )}
                    />
                        </View>
                }
                {!isXs() &&
                <Text style={classes.initialTextStyle}>
                    {t( TABLE_PAGE_COUNTER, { itemsLowerLimit, itemsUpperLimit, itemsCount } )}
                </Text>
                }
                {
                    pagesCount > 1 && currentPage > 0 &&
                    <Button
                        onPress={changePage.bind( this, 0 )}
                        iconLeft={jumpToFirstIcon}
                    />
                }
                {
                    pagesCount > 1 && currentPage > 0 &&
                    <Button
                        onPress={changePage.bind( this, currentPage - 1 )}
                        title={( currentPage - 1 ).toString()}
                    />
                }
                {
                    pagesCount > 1 &&
                    <Button
                        title={currentPage.toString()}
                        disabled={true}
                    />
                }
                {
                    pagesCount > 1 && currentPage < pagesCount &&
                    <Button
                        onPress={changePage.bind( this, currentPage + 1 )}
                        title={( currentPage + 1 ).toString()}
                    />
                }
                {
                    pagesCount > 1 && currentPage < pagesCount &&
                    <Button
                        onPress={changePage.bind( this, pagesCount )}
                        iconLeft={jumpToLastIcon}
                    />
                }
            </View>
        );
    }
}

const componentName = 'TablePageNavigator';
export const TablePageNavigator = compose(
    translate(),
    createStyles( styles, componentName ),
)( CTablePageNavigator ) as React.ComponentType<OwnProps>;