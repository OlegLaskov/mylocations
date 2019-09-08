import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './r-data';
import flags from './r-flags';

export default combineReducers({
    routing: routerReducer,
    data,
    flags
})


/* (state, action) => {
    return {
        data: data(state, action),
        flags: flags(state, action)
    };
}; */
