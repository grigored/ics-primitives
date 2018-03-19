import * as React from 'react';
import {Provider} from "react-redux";
import {reducer as formReducer} from 'redux-form';
// import {formHelpers, persistedTableOptions, table} from "../src/index";
import {formHelpers} from "../src/redux/reducers/formHelpers";
import {persistedTableOptions} from '../src/redux/reducers/persistedTableOptions';
import {table} from '../src/redux/reducers/table';
import { storiesOf } from '@storybook/react';
import {combineReducers, compose, createStore} from 'redux';
import {TableComponent} from '../src/nativeComponents/TableComponent/TableComponent';
//
let store = createStore(
    combineReducers({
        formHelpers,
        form: formReducer,
        persistedTableOptions,
        table,
    }),
    {},
    compose(...[])
);

const Comp = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

storiesOf('TableComponent', module)
    .add('Table', () => {
        return (
            <Comp>
            <TableComponent

            />
            </Comp>
        );
        // return (
        //     <div>
        //         ASDQWE
        //     </div>
        // );
    });