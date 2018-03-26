import * as React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from "react-redux";
import {Alert} from './Alert';
import { navigation } from "../../redux/reducers/navigation";

const store = createStore(combineReducers({navigation}));

export const AlertStories = [{
    title: 'one button',
    component: () => (
        <Provider store={store}>
            <Alert alertId={"A"}/>
        </Provider>
    )
}];
