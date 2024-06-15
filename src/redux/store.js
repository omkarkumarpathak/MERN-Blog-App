import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { version } from 'mongoose';

const rootReducer=combineReducers({
  user:userReducer,
});

const persistConfig={
  key: 'root',
  Storage,
  version:1,
};

const persistedReducer=persistedReducer(persistConfig)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false}),
})

export const persistor=persistStore(store);