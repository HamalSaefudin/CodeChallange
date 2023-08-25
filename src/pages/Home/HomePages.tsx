import globalStyles from '@constants/globalStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FloatingButton from '@src/components/FloatingButton/FloatingButton';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import {getCars} from '@src/redux/actions/cars';
import {RootState} from '@src/redux/store';
import {CarDocument} from '@src/types/cars';
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import ListCars from '../Cars/Components/ListCars';
import {hideLoading, showLoading} from '@src/redux/actions/spinner';
import firestore from '@react-native-firebase/firestore';
import {setGetOrdersCallback} from '@src/redux/actions/orders';
type Props = NativeStackScreenProps<RootStackParamType, routesEnum.HOME_PAGE>;

const HomePages: React.FC<Props> = ({navigation}) => {
  const user = useSelector((state: RootState) => state.auth.loginCallback.user);
  const isAdmin = user?.email?.split('@')[0].toLowerCase() === 'admin';
  const dispatch = useDispatch();
  const cars: CarDocument[] = useSelector(
    (state: RootState) => state.car?.cars,
  );
  const orders: CarDocument[] = useSelector(
    (state: RootState) => state.orders?.getOrdersCallback,
  );

  const getOrders = useCallback(
    (userId: string) => {
      dispatch(showLoading());
      firestore()
        .collection('orders_collection')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          const documents: any[] = [];
          querySnapshot.forEach((doc: any) => {
            documents.push({id: doc.id, ...doc.data()});
          });
          dispatch(setGetOrdersCallback(documents));
        })
        .catch(e => console.log(e, 'er'))
        .finally(() => {
          dispatch(hideLoading());
        });
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getCars());
    getOrders(user?.uid);
  }, [dispatch, getOrders, user]);
  console.log(cars.length);

  return (
    <SafeAreaView style={globalStyles.layout.rootContainer}>
      <ListCars data={cars} totalOrders={orders.length} />
      {isAdmin && (
        <FloatingButton
          size={moderateScale(30)}
          onPress={() => {
            navigation.navigate(routesEnum.CARS_PAGE, {
              totalCars: cars.length || 0,
            });
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default HomePages;