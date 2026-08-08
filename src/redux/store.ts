import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import {
  useSelector,
  useDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import userReducer from "./slices/user.slice";
import cartReducer from "./slices/cart.slice";
import persistStore from "redux-persist/es/persistStore";

const customLocalStorage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage: customLocalStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
