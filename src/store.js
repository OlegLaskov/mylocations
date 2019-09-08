import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const logMiddleware = ({ getState }) => (next) => (action) => {
    //console.log(action.type, getState());
    return next(action);
};

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(logMiddleware)
  ));

export default store;