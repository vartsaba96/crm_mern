import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import auth from '../reducers/auth';


const initialState = {};

const middleware = [thunk];
const reducers = combineReducers({
    auth
})
const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;


