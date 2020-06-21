import { createStore, combineReducers } from 'redux';
import myReducer from '../reducers/index';

const rootReducer = combineReducers({
    myReducer: myReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;