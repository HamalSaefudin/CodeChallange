import {fork} from 'redux-saga/effects';
import authSaga from './auth';
import carSaga from './car';
import ordersSaga from './order';

export default function* () {
  yield fork(authSaga);
  yield fork(carSaga);
  yield fork(ordersSaga);
}
