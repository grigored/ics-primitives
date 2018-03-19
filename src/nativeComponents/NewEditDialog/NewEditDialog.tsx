import * as React from "react";
import { connect } from "react-redux";
import { all, createStyles, Form, isWeb, native, ScrollView, sendFormData, Text, web, WithStyles } from "../../";
import { _t, getNestedField } from "src/utils/common";
import { ADD_ITEM, DATA_SAVED, EDIT, SAVE } from "src/utils/strings";
import { StyleRules } from "src/utils/theme.types";
import { getScreenProps } from "../../primitives/platform/platform";
import { popScreen } from "../../redux/reducers/navigation";
import { setRefreshTable } from "../../redux/reducers/table";

const FORM_NAME = 'new_edit_dialog';

const styles: () => StyleRules = () => ( {
    container: {
        flexDirection: 'column',
        [native]: {
            position: 'relative',
        },
        // width: '100%',
        height: '100%',
        [web]: {
            overflow: 'auto',
        },

    },
    formStyle: {
        [web]: {
            width: '50%',
            marginLeft: '25%',
            marginRight: '25%',
        },
        [all]: {
            width: '100%',
        }
    },
} );

export interface Props {

    field: string,
    title: string,
    description: string,
    options: Array<{
        value: any,
        text: string,
    }>,
    nullable: boolean,
    onChange: Function,
    showDivider: boolean,
    fullWidth: boolean,
    defaultValue: any,
}

export interface ConnectedProps {
    formError: string,
    sendingForm: boolean,
    sendFormSuccess: boolean,

    popScreen: typeof popScreen,
    sendFormData: typeof sendFormData,
    setRefreshTable: typeof setRefreshTable,
}

type AllProps = Props & ConnectedProps & WithStyles & NavigationProps & DisplayAlertProps;

class CNewEditDialog extends React.PureComponent<AllProps, {}> {

    static defaultProps = {
        nullable: false,
        fullWidth: false,
    };

    static alertsData = () => ( {
        [DIALOG_IDS.SAVED_DATA_SUCCESS]: {
            body: DATA_SAVED,
        },
        [DIALOG_IDS.FORM_HAS_ERRORS]: {},
    } );

    static navigationOptions = ( { navigation }: any ) => (
        getTopbar(
            navigation,
            getNestedField( navigation.state, ['params', 'nonUrlProps', 'isEdit'] ) ? EDIT : ADD_ITEM,
            null,
            {
                imgSrc: iconList.arrowBack,
                goBack: true
            },
            {
                text: SAVE,
                onPress: () => {
                    let { sendingForm, formError, displayAlert } = navigation.state.params,
                        url = null, method = null;
                    if (formError) {
                        displayAlert( DIALOG_IDS.FORM_HAS_ERRORS, _t( formError ) );
                        return;
                    }
                    if (isWeb) {
                        url = navigation.state.params.nonUrlProps.url;
                        method = navigation.state.params.nonUrlProps.method;
                    }
                    else {
                        url = navigation.state.params.url;
                        method = navigation.state.params.method;
                    }
                    if (sendingForm) {
                        return;
                    }

                    return sendFormData( FORM_NAME, url, method );
                }
            }
        )
    );

    componentWillMount() {
        if (!isWeb) {
            this.props.navigation.setParams( {
                ...( this.props.navigation.state.params || {} ),
                isEdit: getScreenProps( this.props ).nonUrlProps.isEdit,
                url: getScreenProps( this.props ).nonUrlProps.url,
                method: getScreenProps( this.props ).nonUrlProps.method,
            } )
        }
    }

    componentWillReceiveProps( nextProps: AllProps ) {
        if (!isWeb) {
            this.props.navigation.setParams( {
                ...( this.props.navigation.state.params || {} ),
                sendingForm: nextProps.sendingForm,
                formError: nextProps.formError,
                sendFormSuccess: nextProps.sendFormSuccess,
                displayAlert: nextProps.displayAlert,
            } )
        }
        if (!this.props.sendFormSuccess && nextProps.sendFormSuccess) {
            nextProps.displayAlert( DIALOG_IDS.SAVED_DATA_SUCCESS );
            nextProps.setRefreshTable( getScreenProps( this.props ).nonUrlProps.tableId );
        }
    }

    render() {
        let { classes, sendingForm, } = this.props,
            { tableDefinitionDataColumns, formErrorChecker, defaultValues } = getScreenProps( this.props ).nonUrlProps;

        return (
            <ScrollView style={classes.container}>
                <Form
                    form={FORM_NAME}
                    initialValues={defaultValues}
                    fieldDefinitions={tableDefinitionDataColumns}
                    validate={formErrorChecker}
                    containerStyle={classes.formStyle}
                />
                {
                    sendingForm &&
                    <Text>Loading</Text>
                }
            </ScrollView>
        );
    }
}

const componentName = 'NewEditDialog';
export const NewEditDialog: React.ComponentType<Props> = connect(
    ( state: any ) => ( {
        params: state.persisted.params,
        formError: getNestedField( state.form, [FORM_NAME, 'syncErrors', 'form',] ),
        sendingForm: getNestedField( state.formHelpers, [FORM_NAME, 'sendingForm'] ),
        sendFormSuccess: getNestedField( state.formHelpers, [FORM_NAME, 'sendFormSuccess'] ),
    } ),
    {
        popScreen,
        sendFormData,
        setRefreshTable,
    }
)(
    displayAlerts<Props & ConnectedProps>(
        componentName,
        addTopBar<Props & ConnectedProps>(
            createStyles<Props & ConnectedProps>( styles, componentName, CNewEditDialog )
        )
    )
);
