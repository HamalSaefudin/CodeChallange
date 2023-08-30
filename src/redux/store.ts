import {EnhancedStore, combineReducers, configureStore} from '@reduxjs/toolkit';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import sagas from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

export const store: EnhancedStore = configureStore({
  reducer: combineReducers(reducers),
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

function* rootSaga() {
  yield all([fork(sagas)]);
}
sagaMiddleware.run(rootSaga);
