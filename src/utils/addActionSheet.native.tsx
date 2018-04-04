import * as React from 'react';
import { compose } from 'redux';
import { ActionSheetIOS, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Button, createStyles, View } from '../';
import { hoistNonReactStatics } from '../lib/hoist-non-react-statics';
import { isIOS } from '../primitives/platform/platform';
import { showActionSheet } from '../redux/reducers/dialog';
import { ACTION_SHEETS_IDS } from '../utils/enums';
import { android, ios } from './theme';
import { StyleRules, WithStyles } from './theme.types';

export function connectActionSheet( WrappedComponent: any ): any {
    if (isIOS) {
        return connectActionSheetIos(WrappedComponent);
    }
    return connectActionSheetAndroid(WrappedComponent);
}

export interface ConnectedPropsAndroid {
    sheetVisible: boolean,
    showActionSheet: typeof showActionSheet,
}

export interface ActionSheetNativeProps {
    connectedShowActionSheet: Function,
}

function connectActionSheetAndroid( WrappedComponent: any ) {

    const styles: () => StyleRules = () => ({
        dialog: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dataContainer: {
            width: '80%',
            borderRadius: {
                [ios]: 14,
                [android]: 4,
            },
            backgroundColor: 'rgb(255,255,255)',
            flexDirection: 'column',
        }
    });

    class CEnhance extends React.PureComponent<ConnectedPropsAndroid & WithStyles, { visible: boolean, sheetId?: ACTION_SHEETS_IDS }> {
        private onClose: () => void;

        constructor( props: ConnectedPropsAndroid & WithStyles ) {
            super(props);
            this.onClose = () => {
                props.showActionSheet(this.state.sheetId, false);
                this.setState({visible: false});
            };
            this.state = {
                visible: false,
                sheetId: undefined,
            };
        }

        render() {
            const {classes, showActionSheet} = this.props,
                {visible, sheetId} = this.state;
            let sheetData: { options: Array<string>, optionClick: ( index: number ) => void } | undefined = undefined;
            if (sheetId) {
                sheetData = WrappedComponent.actionSheetData(this.props)[sheetId];
            }
            return (
                <View>
                    <WrappedComponent
                        {...this.props}
                        connectedShowActionSheet={( sheetId: ACTION_SHEETS_IDS ) => {
                            showActionSheet(sheetId);
                            this.setState({sheetId, visible: true})
                        }}
                    />
                    {
                        sheetId &&
                        <Modal
                            transparent={true}
                            visible={visible}
                            onRequestClose={this.onClose}
                            animationType={'fade'}
                        >
                            <View style={classes.dialog}>
                                <View style={classes.dataContainer}>
                                    {
                                        sheetData && sheetData.options.map(( option: string, index: number ) =>
                                            <Button
                                                title={option}
                                                onPress={() => {
                                                    this.onClose();
                                                    sheetData && sheetData.optionClick(index);
                                                }}
                                                // dividerBottom={index !== (sheetData && sheetData.options.length) ? DIVIDER_TYPE.FULL_WIDTH : undefined}
                                            />
                                        )
                                    }
                                </View>
                            </View>
                        </Modal>
                    }
                </View>
            );
        }
    }

    const Enhance = compose(
        connect(null, {showActionSheet}),
        createStyles(styles, 'EnhanceSheet'),
    )(CEnhance);
    // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
    hoistNonReactStatics(Enhance, WrappedComponent, null);
    return Enhance;
}

export interface ConnectedPropsIos {
    showActionSheet: typeof showActionSheet,
}

function connectActionSheetIos( WrappedComponent: any ) {
    class CEnhance extends React.PureComponent<ConnectedPropsIos, {}> {
        render() {
            const {showActionSheet} = this.props;
            return (
                <WrappedComponent
                    {...this.props}
                    connectedShowActionSheet={( sheetId: ACTION_SHEETS_IDS ) => {
                        showActionSheet(sheetId);
                        const sheetData = WrappedComponent.actionSheetData(this.props)[sheetId];
                        ActionSheetIOS.showActionSheetWithOptions(
                            {
                                options: sheetData.options,
                                cancelButtonIndex: sheetData.options.length - 1,
                                destructiveButtonIndex: -1,
                            },
                            ( buttonIndex: any ) => {
                                sheetData.optionClick(buttonIndex)
                                // Do something here depending on the button index selected
                            }
                        );

                    }}
                />
            );
        }
    }

    const Enhance = connect(null, {showActionSheet})(CEnhance);
    // need this for statics like react-native-navigation navigatorStyle/ navigatorButtons
    hoistNonReactStatics(Enhance, WrappedComponent, null);
    return Enhance;
}
