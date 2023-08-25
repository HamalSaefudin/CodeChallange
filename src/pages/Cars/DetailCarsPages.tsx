import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '@src/constants/globalStyles';
import imagePath from '@src/constants/imagePath';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import React, {useCallback} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import IIonIcons from 'react-native-vector-icons/Ionicons';
import styles from './DetailCarsPages.styles';
import {currencyFormat} from '@src/utils/utils';
import Rating from '@src/components/Rating/Rating';
import Spacer from '@src/components/Spacer/Spacer';
import {RootState} from '@src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {hideLoading, showLoading} from '@src/redux/actions/spinner';
import {getCars} from '@src/redux/actions/cars';
import {CreateOrderInterface} from '@src/types/orders';
import {goBack} from '@src/routes/indexRoutes';
import {setGetOrdersCallback} from '@src/redux/actions/orders';

type Props = NativeStackScreenProps<
  RootStackParamType,
  routesEnum.DETAIL_CARS_PAGE
>;

const DetailCarsPages: React.FC<Props> = ({navigation, route}) => {
  const car = route.params;
  const user = useSelector((state: RootState) => state.auth.loginCallback.user);
  const isAdmin = user?.email?.split('@')[0].toLowerCase() === 'admin';
  const dispatch = useDispatch();

  const deleteData = useCallback(
    (id: number | string) => {
      dispatch(showLoading());
      firestore()
        .collection('cars_collection')
        .where('id', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.docs[0]?.ref?.delete();
          dispatch(getCars());
          navigation.goBack();
        })
        .catch(e => console.log(e, 'er'))
        .finally(() => {
          dispatch(hideLoading());
        });
    },
    [dispatch, navigation],
  );

  const createOrder = useCallback(
    (id: string, payload: CreateOrderInterface) => {
      dispatch(showLoading());
      firestore()
        .collection('orders_collection')
        .doc(id)
        .set(payload)
        .then(() => {
          dispatch(showLoading());
          firestore()
            .collection('orders_collection')
            .where('userId', '==', payload.userId)
            .get()
            .then(querySnapshot => {
              const documents: any[] = [];
              querySnapshot.forEach((doc: any) => {
                documents.push({id: doc.id, ...doc.data()});
              });
              dispatch(setGetOrdersCallback(documents));
              goBack();
            })
            .catch(e => console.log(e, 'er'))
            .finally(() => {
              dispatch(hideLoading());
            });
        })
        .catch(e => console.log(e, 'er'))
        .finally(() => {
          dispatch(hideLoading());
        });
    },
    [dispatch],
  );
  return (
    <SafeAreaView style={[globalStyles.layout.rootContainer]}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <IIonIcons
            name="arrow-back-circle-outline"
            size={moderateScale(36)}
            color={globalStyles.colors.common.white}
          />
        </TouchableOpacity>
        <Image
          source={imagePath.DEFAULT_CAR_ILLUSTRATION}
          style={styles.image}
        />
        <View style={styles.overlay} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Rating rating={Number(car.rating)} />
        <View style={styles.row}>
          <View>
            <Text
              style={styles.title}>{`${car.carName} - ${car.carType}`}</Text>
            <Text style={styles.subTitle}>
              Price: {currencyFormat(Number(car.hourlyRate), 'symbol')} / Hour
            </Text>
          </View>
          <View>
            <Text style={styles.priceText}>{`Fuel: ${car.fuelType}`}</Text>
          </View>
        </View>
        <Spacer height={moderateScale(50)} />
        <View style={styles.footer}>
          {isAdmin ? (
            <View style={styles.flex1}>
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => {
                  navigation.navigate(routesEnum.CARS_PAGE, {
                    formCar: car,
                  });
                }}>
                <Text style={styles.txtEdit}>Edit</Text>
              </TouchableOpacity>
              <Spacer height={moderateScale(10)} />

              <Spacer width={moderateScale(20)} />
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => {
                  deleteData(car.id);
                }}>
                <Text style={styles.txtDelete}>Delete</Text>
              </TouchableOpacity>
              <Spacer height={moderateScale(10)} />

              <TouchableOpacity
                style={styles.btnConfirm}
                onPress={() => {
                  const payload = {
                    userId: user?.uid,
                    carId: car.id,
                  };
                  createOrder(`${Number(car.totalOrders) + 1}`, payload);
                }}>
                <Text style={styles.txtConfirm}>Order</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.btnConfirm}
              onPress={() => {
                const payload = {
                  userId: user?.uid,
                  carId: car.id,
                };
                createOrder(`${Number(car.totalOrders) + 1}`, payload);
              }}>
              <Text style={styles.txtConfirm}>Order</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailCarsPages;
