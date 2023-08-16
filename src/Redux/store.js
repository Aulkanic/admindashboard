import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import loginReducer from './loginSlice'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
        login: loginReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer ,
})


export const persistor = persistStore(store)
export default store;