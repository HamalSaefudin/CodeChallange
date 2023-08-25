import {call, put, takeLatest} from 'redux-saga/effects';
import {postLogin, setLoginCallback} from '../actions/auth';
import auth from '@react-native-firebase/auth';
import {hideLoading, showLoading} from '../actions/spinner';
import {LoginCallback, PostLoginInterface} from '@src/types/auth';

export function* fetchLogin({payload}: {payload: PostLoginInterface}) {
  yield put(showLoading());
  try {
    const res: LoginCallback = yield call(
      [auth(), auth().signInWithEmailAndPassword],
      payload.username,
      payload.password,
    );
    yield put(setLoginCallback(res));
  } catch (error: any) {
    yield put(setLoginCallback(error.code));
  } finally {
    yield put(hideLoading());
  }
}

export default function* authSaga() {
  yield takeLatest(postLogin, fetchLogin);
}
