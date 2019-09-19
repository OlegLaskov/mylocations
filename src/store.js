import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const logMiddleware = ({ getState }) => (next) => (action) => {
    //console.log(action.type, getState());
    if(action.type === '@@router/LOCATION_CHANGE'){
        //console.log('vibrate');
        vibrate(100);
    }
    return next(action);
};

const vibrate = (val) => {
    if("vibrate" in navigator)  return navigator.vibrate(val);
    if("oVibrate" in navigator)  return navigator.oVibrate(val);
    if("mozVibrate" in navigator)  return navigator.mozVibrate(val);
    if("webkitVibrate" in navigator)  return navigator.webkitVibrate(val);
}

const store = createStore(reducer, composeWithDevTools(
        applyMiddleware(logMiddleware)
    ));

export default store;