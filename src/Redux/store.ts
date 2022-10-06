import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {AppReducer} from "./app-reducer";
import {XReducer} from "./x-reducer";


let rootReducer = combineReducers({
    app: AppReducer,
    x: XReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof rootReducer>