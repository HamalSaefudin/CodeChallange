import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {CreateOrderInterface} from '@src/types/orders';
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {
  createOrder,
  getOrders,
  setCreateOrderCallback,
  setGetOrdersCallback,
} from '../actions/orders';
import {hideLoading, showLoading} from '../actions/spinner';
import {getCars} from '../actions/cars';
import {RootState} from '../store';

export function* createOrderProcess({
  payload,
}: {
  payload: CreateOrderInterface;
}) {
  yield put(showLoading());
  try {
    const py = {...payload};
    delete py.id;
    const documentRef = firestore()
      .collection('orders_collection')
      .doc(payload.id);

    yield documentRef.set(py);
    yield put(getOrders());
    yield put(setCreateOrderCallback({isSuccess: true, isFailed: false}));
  } catch (error) {
    yield put(setCreateOrderCallback({isSuccess: false, isFailed: true}));
  } finally {
    yield put(hideLoading());
  }
}

export function* fetchOrders(): Generator {
  yield put(showLoading());
  try {
    const userId = yield select(
      (state: RootState) => state?.auth?.loginCallback?.user?.uid,
    );
    const collectionRef = firestore().collection('orders_collection');
    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot | any =
      yield call([
        collectionRef,
        collectionRef.where('userId', '==', userId).get,
      ]);

    const carRef = firestore().collection('cars_collection');
    const documents = yield all(
      querySnapshot.docs.map(function* (
        doc: FirebaseFirestoreTypes.QueryDocumentSnapshot,
      ) {
        const carSnapshot: FirebaseFirestoreTypes.QuerySnapshot = yield call([
          carRef,
          carRef.get,
        ]);
        const car: any = carSnapshot.docs.find(x => x.id === doc.data().carId);
        return {...doc.data(), ...car?.data()};
      }),
    );

    yield put(setGetOrdersCallback(documents));
    yield put(getCars());
  } catch (error) {
    console.log(error);
  } finally {
    yield put(hideLoading());
  }
}

export default function* ordersSaga() {
  yield takeLatest(createOrder, createOrderProcess);
  yield takeLatest(getOrders, fetchOrders);
}
