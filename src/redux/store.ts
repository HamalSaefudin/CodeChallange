import {EnhancedStore, combineReducers, configureStore} from '@reduxjs/toolkit';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import sagas from './sagas/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const rootReducers = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store: EnhancedStore = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

function* rootSaga() {
  yield all([fork(sagas)]);
}
sagaMiddleware.run(rootSaga);
