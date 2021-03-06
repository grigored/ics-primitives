import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Provider} from "react-redux";
import {combineReducers, compose, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {TableComponent} from '../src/nativeComponents/TableComponent/TableComponent';
import {formHelpers} from "../src/redux/reducers/formHelpers";
import {persistedTableOptions} from '../src/redux/reducers/persistedTableOptions';
import {table} from '../src/redux/reducers/table';
import {FORM_INPUT_TYPES} from '../src/utils/enums';
import {I18nextProvider} from 'react-i18next';
import {View} from '../src/primitives/View/View';
// @ts-ignore
import i18n from 'i18next';
import {Select} from "../src";

let store = createStore(
    combineReducers({
        formHelpers,
        form: formReducer,
        persistedTableOptions,
        table,
    }),
    {
        table: {
            test_table: {
                data: {
                    items: [
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                        {fname: "A", lname: 'B', fname2: "X", lname2: "Y"},
                    ]
                },
            },
        },
    },
    compose(...[])
);

const Comp = ({children}: any) => {
    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n.init({})}>
                {children}
            </I18nextProvider>
        </Provider>
    )
};

storiesOf('TableComponent', module)
    .add('Table', () => {

        let tableDefinition = {
            title: 'Table Name',
            dataName: 'test_table',
            allowFilters: false,
            columns: () => [
                {
                    field: 'fname',
                    title: 'First Name',
                    type: FORM_INPUT_TYPES.TEXT,
                },
                {
                    field: 'lname',
                    title: 'Last Name',
                    type: FORM_INPUT_TYPES.TEXT,
                },
                {
                    field: 'fname2',
                    title: 'First Name',
                    type: FORM_INPUT_TYPES.TEXT,
                },
                {
                    field: 'lname2',
                    title: 'Last Name',
                    type: FORM_INPUT_TYPES.TEXT,
                },
            ],
        };
        return (
            <Comp>
                <View style={{
                    height: 400,
                    width: 300,
                }}>
                    <TableComponent
                        title={'Test2'}
                        tableDefinition={tableDefinition}
                        extraActions={[
                            {title: 'My action', onPress: () => console.log('asd')}
                        ]}
                    />

                </View>
            </Comp>
        );
    });


storiesOf('Inputs', module)
    .add('Select', () => (
        <Select
            options={[
                {text: "Option1", value: "option1value"},
                {text: "Option2", value: "option2value"},
            ]}
            onChange={(value) => console.log(value)}
            nullName={"Please select something"}
            nullable={false}
        />
    ));