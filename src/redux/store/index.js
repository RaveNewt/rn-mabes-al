import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import allReducers from "../reducers";
import { authAPI } from "../../services/authAPI";
import { rankAPI } from "../../services/rankAPI";
import { statusAPI } from "../../services/statusAPI";

const persistedReducer = persistReducer(
    {
        key: "mabes",
        storage: AsyncStorage,
    },
    allReducers
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat([
            authAPI.middleware,
            rankAPI.middleware,
            statusAPI.middleware,
        ]),
});

const persistor = persistStore(store);

export { store, persistor };
