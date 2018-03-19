import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {Provider} from "react-redux";
import {combineReducers, compose, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {TableComponent} from '../src/nativeComponents/TableComponent/TableComponent';
import {formHelpers} from "../src/redux/reducers/formHelpers";
import {persistedTableOptions} from '../src/redux/reducers/persistedTableOptions';
import {table} from '../src/redux/reducers/table';
import {FORM_INPUT_TYPES} from '../src/utils/enums';

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
                    items:[
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                        {
                            fname: 'asd',
                            lname: 'qwe',
                        },
                        {
                            fname: 'asd1',
                            lname: 'qwe1',
                        },
                        {
                            fname: 'asd2',
                            lname: 'qwe2',
                        },
                        {
                            fname: 'asd3',
                            lname: 'qwe3',
                        },
                        {
                            fname: 'asd4',
                            lname: 'qwe4',
                        },
                    ],
                },
            },
        },
    },
    compose(...[])
);

const Comp = ({children}:any) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

storiesOf('TableComponent', module)
    .add('Table', () => {

        let tableDefinition = {
            url: 'table',
            tableName: 'Table Name',
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
            ]
        };
        return (
            <Comp>
                <TableComponent
                    title={'Test'}
                    tableDefinition={tableDefinition}
                />
            </Comp>
        );
        // return(<div>ASD</div>)
    });