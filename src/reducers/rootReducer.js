import { combineReducers } from "redux";
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { goalReducer } from './goalReducer';

export const rootReducer =  combineReducers({
    auth: authReducer,
    category: categoryReducer,
    goal: goalReducer
})