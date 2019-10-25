import {combineReducers} from 'redux';
import searchFormReducer from './searchFormReducer';
import { loadingBarReducer } from 'react-redux-loading-bar'

let reducers = combineReducers({
    searchFormReducer,
    loadingBar: loadingBarReducer,
})

export default reducers;