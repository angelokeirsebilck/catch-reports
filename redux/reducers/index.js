import { combineReducers } from 'redux';
import { auth } from './auth';
import { alert } from './alert';

const Reducer = combineReducers({
    auth,
    alert,
});

export default Reducer;
