// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import setusernameReducer from './appreducer.js';

const persistConfig={
    key:'root',
    storage,
}

const rootReducers=combineReducers({
    setusernameReducer:setusernameReducer,
 
})

const persistedReducer=persistReducer(persistConfig,rootReducers)

const store= configureStore({
    reducer:persistedReducer,
});

const persistor=persistStore(store);

export {store,persistor};