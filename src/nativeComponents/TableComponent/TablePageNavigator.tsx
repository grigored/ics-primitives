import * as React from 'react';
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { TABLE_PAGE_COUNTER, ITEMS_PER_PAGE } from "../../utils/strings";
import {
    // ALL,
    all, android, appTheme, Button, createStyles, ios, isXs, Select, Text, View, webDesktop, WithStyles
} from '../../';


const styles = () => ( {
    container: {
        marginTop: appTheme.defaultVerticalMargin,
        marginBottom: appTheme.defaultVerticalMargin,
        height: 24,
        minHeight: 24,
        maxHeight: 24,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        flexShrink: 0,
        marginLeft: {
            [webDesktop]: 0,
            [all]: appTheme.marginM,
        },
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
        minWidth: 128,
        width: 128,
        maxWidth: 128,
    },
    buttonsRoot: {
        [webDesktop]: {},
        [all]: {
            minWidth: 32,
            minHeight: 24,
            width: 32,
            height: 24,
            maxWidth: 32,
            maxHeight: 24,
            marginLeft: appTheme.marginS,
            backgroundColor: '#ffffff',
            padding: 0,
        },
    },
    disabled: {
        backgroundColor: 'transparent',
        color: appTheme.primaryColor
        // borderWidth: 2,
        // borderStyle: 'solid',
        // borderColor: '#ffffff',
    },
    buttonLabel: {
        color: '#000000',
    },
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

    getItemsPerPageOptions() {
        let { itemsPerPageOptions } = this.props;

        return [
            ...itemsPerPageOptions!.map( ( value: number ) => ( {
                text: value.toString(),
                value,
            } ) ),
            // {
            //     text: t( ALL ),
            //     value: 1000000,
            // }
        ]
    }

    render() {
        let {            
            classes, style, itemsCount, itemsLowerLimit, itemsUpperLimit, currentPage, pagesCount, changePage,            
            jumpToFirstIcon, jumpToLastIcon, t, itemsPerPageValue, itemsPerPageOptions, changeItemsPerPage,
        } = this.props;
        return (
            <View style={[classes.container, style || {}]}>
                {
                    !!itemsPerPageValue && !!itemsPerPageOptions && !!changeItemsPerPage &&
                    <View style={classes.itemsPerPageContainer}>
                        <Select
                            title={t( ITEMS_PER_PAGE )}
                            value={itemsPerPageValue}
                            options={this.getItemsPerPageOptions()}
                            onChange={( value: number ) => changeItemsPerPage!( value )}
                        />
                    </View>
                }

                {!!pagesCount && <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    {!isXs() &&
                        <Text style={classes.initialTextStyle}>
                            {t(TABLE_PAGE_COUNTER, { itemsLowerLimit, itemsUpperLimit, itemsCount })}
                        </Text>
                    }
                    {
                        <Button
                            disabled={!(pagesCount < 1) && !(currentPage > 0)}
                            onPress={changePage.bind(this, 0)}
                            iconLeft={jumpToFirstIcon}
                            styles={{ root: classes.buttonsRoot }}
                        />
                    }
                    {
                        pagesCount > 1 && currentPage > 0 &&
                        <Button
                            onPress={changePage.bind(this, currentPage - 1)}
                            title={(currentPage).toString()}
                            styles={{ root: classes.buttonsRoot, label: classes.buttonLabel }}
                        />
                    }
                    {
                        pagesCount > 1 &&
                        <Button
                            title={(currentPage + 1).toString()}
                            disabled={true}
                            styles={{ root: [classes.buttonsRoot, classes.disabled], label: classes.buttonLabel }}
                        />
                    }
                    {
                        pagesCount > 1 && currentPage < pagesCount - 1 &&
                        <Button
                            onPress={changePage.bind(this, currentPage + 1)}
                            title={(currentPage + 2).toString()}
                            styles={{ root: classes.buttonsRoot, label: classes.buttonLabel }}
                        />
                    }
                    {
                        <Button
                            disabled={(pagesCount > 1) && !(currentPage < pagesCount - 1)}
                            onPress={changePage.bind(this, pagesCount - 1)}
                            iconLeft={jumpToLastIcon}
                            styles={{ root: classes.buttonsRoot }}
                        />
                    }
                </View>}
            </View>
        );
    }
}

const componentName = 'TablePageNavigator';
export const TablePageNavigator = compose(
    translate(),
    createStyles( styles, componentName ),
)( CTablePageNavigator ) as React.ComponentType<OwnProps>;