import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewarde = [thunk];
const inittalState = {};
const store = createStore(
    rootReducer,
    inittalState,
    composeWithDevTools(applyMiddleware(...middlewarde))
);

export default store;
