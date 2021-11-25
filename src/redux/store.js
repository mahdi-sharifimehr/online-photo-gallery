import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import imagesReducer from './reducers';

const rootReducer = combineReducers({ imagesReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));