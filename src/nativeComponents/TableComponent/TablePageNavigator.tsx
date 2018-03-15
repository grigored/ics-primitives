import * as React from "react";
import { android, appTheme, Button, createStyles, ios, isXs, Text, View, WithStyles } from "src";
import { StyleRules } from "src/utils/theme.types";


const styles = () => ({
    container: {
        marginTop: appTheme.defaultVerticalMargin,
        marginBottom: appTheme.defaultVerticalMargin,
        height: 24,
        flexWrap: 'wrap',
        // position: 'absolute',
        // bottom: 0,
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

interface Props {
    style: StyleRules,
    itemsCount: number,
    itemsLowerLimit: number,
    itemsUpperLimit: number,
    currentPage: number,
    pagesCount: number,
    changePage: (page: number) => void,
}

const CTablePageNavigator = ({
                                 classes,
                                 style,
                                 itemsCount,
                                 itemsLowerLimit,
                                 itemsUpperLimit,
                                 currentPage,
                                 pagesCount,
                                 changePage
                             } : Props & WithStyles) => {

    return (
        <View style={[classes.container, classes.buttonsContainers, style]}>
            {!isXs() &&
            <Text style={classes.initialTextStyle}>
                Items {itemsLowerLimit} to {itemsUpperLimit} of {itemsCount}
            </Text>
            }
            {
                pagesCount > 1 && currentPage > 1 &&
                <Button
                    onPress={changePage.bind(this, 1)}
                    // icon={iconList.fastRewind}
                    // iconStyle={classes.iconStyle}
                    // style={classes.buttonStyle}
                    // touchableStyle={classes.buttonsTouchableStyle}
                />
            }
            {
                pagesCount > 1 && currentPage > 1 &&
                <Button
                    onPress={changePage.bind(this, currentPage - 1)}
                    title={(currentPage - 1).toString()}
                    // style={classes.buttonStyle}
                    // touchableStyle={classes.buttonsTouchableStyle}
                />
            }
            {
                pagesCount > 1 &&
                <Button
                    title={currentPage.toString()}
                    // style={classes.buttonStyle}
                    disabled={true}
                    // touchableStyle={classes.buttonsTouchableStyle}
                />
            }
            {
                pagesCount > 1 && currentPage < pagesCount &&
                <Button
                    onPress={changePage.bind(this, currentPage + 1)}
                    title={(currentPage + 1).toString()}
                    // style={classes.buttonStyle}
                    // touchableStyle={classes.buttonsTouchableStyle}
                />
            }
            {
                pagesCount > 1 && currentPage < pagesCount &&
                <Button
                    onPress={changePage.bind(this, pagesCount)}
                    // icon={iconList.fastForward}
                    // iconStyle={classes.iconStyle}
                    // style={classes.buttonStyle}
                    // touchableStyle={classes.buttonsTouchableStyle}
                />
            }
        </View>
    )
}

const componentName = 'TablePageNavigator';
export const TablePageNavigator = createStyles<Props>(styles, componentName, CTablePageNavigator);