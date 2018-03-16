import * as React from 'react';
import { Provider } from "react-redux";
import {combineReducers, createStore} from'redux';
import{ reducer as formReducer} from 'redux-form';
import { formHelpers, persistedTableOptions, sendFormData, table } from "../src/index";
import { storiesOf } from '@storybook/react';

let combinedReducers = combineReducers({
    formHelpers,
    form: formReducer,
    persistedTableOptions,
    table,
});

let store = createStore(combineReducers,{});

const Comp = ({children}: {children: any}) => {
    return (
        <Provider store={store}>
                {children}
        </Provider>
    )
};

storiesOf('TableComponent',module)
.add();