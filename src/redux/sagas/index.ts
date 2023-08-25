import {fork} from 'redux-saga/effects';
import authSaga from './auth';
import carSaga from './car';

export default function* () {
  yield fork(authSaga);
  yield fork(carSaga);
}
