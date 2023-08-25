import firestore from '@react-native-firebase/firestore';
import {CarDocument, FormCarInterface} from '@src/types/cars';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getCars,
  postCreateCar,
  setCreateCarCallback,
  setGetCarsCallback,
} from '../actions/cars';
import {goBack, navigate} from '@src/routes/indexRoutes';
import {hideLoading, showLoading} from '../actions/spinner';
import {routesEnum} from '@src/constants/rootStackParamType';

export function* fetchCreateCar({payload}: {payload: FormCarInterface}) {
  yield put(showLoading());
  try {
    const py = {...payload};
    delete py.isEdit;
    const documentRef = firestore()
      .collection('cars_collection')
      .doc(payload.id);
    yield documentRef.set(py);
    yield put(getCars());
    if (payload.isEdit) {
      navigate(routesEnum.HOME_PAGE);
    } else {
      goBack();
    }
  } catch (error) {
    yield put(setCreateCarCallback({isSuccess: false, isFailed: true}));
  } finally {
    yield put(hideLoading());
  }
}

export function* fetchCar(): Generator {
  yield put(showLoading());
  try {
    const collectionRef = firestore().collection('cars_collection');
    const querySnapshot: any = yield call([collectionRef, collectionRef.get]);

    const documents: CarDocument[] = [];
    querySnapshot.forEach((doc: any) => {
      documents.push({id: doc.id, ...doc.data()});
    });
    yield put(setGetCarsCallback(documents));
  } catch (error) {
    yield put(setGetCarsCallback('error'));
  } finally {
    yield put(hideLoading());
  }
}

export default function* carSaga() {
  yield takeLatest(postCreateCar, fetchCreateCar);
  yield takeLatest(getCars, fetchCar);
}
