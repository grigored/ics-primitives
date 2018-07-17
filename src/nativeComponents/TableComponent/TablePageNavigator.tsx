import * as React from 'react';
import { android, appTheme, Button, createStyles, ios, isXs, Text, View, WithStyles } from '../../';
import { StyleRules } from '../../utils/theme.types';


const styles = () => ({
    container: {
        marginTop: appTheme.defaultVerticalMargin,
        marginBottom: appTheme.defaultVerticalMargin,
        height: 24,
        flexWrap: 'wrap',
    },
    initialTextStyle: {
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainers: {
        flexDirection: 'row',
        alignItems: 'center',
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
    }
});

export interface Props {
    style?: StyleRules,
    itemsCount: number,
    itemsLowerLimit: number,
    itemsUpperLimit: number,
    currentPage: number,
    pagesCount: number,
    changePage: ( page: number ) => void,
    jumpToFirstIcon?: any,
    jumpToLastIcon?: any,
}

class CTablePageNavigator extends React.PureComponent<Props & WithStyles, {}> {

    render() {
        let {
            classes, style, itemsCount, itemsLowerLimit, itemsUpperLimit, currentPage, pagesCount, changePage,
            jumpToFirstIcon, jumpToLastIcon
        } = this.props;
        return (
            <View style={[classes.container, classes.buttonsContainers, style || {}]}>
                {!isXs() &&
                <Text style={classes.initialTextStyle}>
                    Items {itemsLowerLimit} to {itemsUpperLimit} of {itemsCount}
                </Text>
                }
                {
                    pagesCount > 1 && currentPage > 0 &&
                    <Button
                        onPress={changePage.bind(this, 0)}
                        iconLeft={jumpToFirstIcon}
                    />
                }
                {
                    pagesCount > 1 && currentPage > 0 &&
                    <Button
                        onPress={changePage.bind(this, currentPage - 1)}
                        title={(currentPage - 1).toString()}
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
                        onPress={changePage.bind(this, currentPage + 1)}
                        title={(currentPage + 1).toString()}
                    />
                }
                {
                    pagesCount > 1 && currentPage < pagesCount &&
                    <Button
                        onPress={changePage.bind(this, pagesCount)}
                        iconLeft={jumpToLastIcon}
                    />
                }
            </View>
        );
    }
}

const componentName = 'TablePageNavigator';
export const TablePageNavigator: React.ComponentType<Props> = createStyles(styles, componentName)(CTablePageNavigator);