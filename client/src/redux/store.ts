import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userReducer from './user/userSlice'
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";


export type RootState = ReturnType<typeof store.getState>

const persistConfig = {
    key:"root",
    version:1,
    storage
}

const persistedReducer = persistReducer(persistConfig,userReducer)

export const store = configureStore({
    reducer:{
        user:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Required for Redux Persist
        }),
})

export const persistor = persistStore(store);

export default store;