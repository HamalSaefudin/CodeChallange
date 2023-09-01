import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Rating from '@src/components/Rating/Rating';
import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import imagePath from '@src/constants/imagePath';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import {deleteCar, setDeleteCarCallback} from '@src/redux/actions/cars';
import {setCreateOrderCallback} from '@src/redux/actions/orders';
import {RootState} from '@src/redux/store';
import {currencyFormat} from '@src/utils/utils';
import React, {useCallback, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import styles from './DetailCarsPages.styles';

type Props = NativeStackScreenProps<
  RootStackParamType,
  routesEnum.DETAIL_CARS_PAGE
>;

const DetailCarsPages: React.FC<Props> = ({navigation, route}) => {
  const car = route.params;
  const user = useSelector((state: RootState) => state.auth.loginCallback.user);
  const carReducer = useSelector((state: RootState) => state.car);
  const orderReducer = useSelector((state: RootState) => state.orders);

  const isAdmin = user?.email?.split('@')[0].toLowerCase() === 'admin';
  const dispatch = useDispatch();

  useEffect(() => {
    if (carReducer?.deleteCarCallback?.isSuccess) {
      dispatch(setDeleteCarCallback({isFailed: false, isSuccess: false}));
      navigation.goBack();
    }
  }, [carReducer, dispatch, navigation]);

  useEffect(() => {
    if (orderReducer?.createOrderCallback?.isSuccess) {
      dispatch(setCreateOrderCallback({isFailed: false, isSuccess: false}));
      navigation.goBack();
    }
  }, [orderReducer?.createOrderCallback, dispatch, navigation]);

  const deleteData = useCallback(
    (id: string) => {
      dispatch(deleteCar(id));
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
            <Text style={styles.title}>{`${car.carName}`}</Text>
            <Text style={styles.txtType}>{`Type: ${car.carType}`}</Text>
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
                    id: `${Number(car.totalOrders) + 1}`,
                  };
                  navigation.navigate(routesEnum.CREATE_ORDER_PAGE, {
                    idOrder: payload,
                  });
                }}>
                <Text style={styles.txtConfirm}>Order</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.btnConfirm, styles.pv0]}
              onPress={() => {
                const payload = {
                  userId: user?.uid,
                  carId: car.id,
                  id: `${Number(car.totalOrders) + 1}`,
                };
                navigation.navigate(routesEnum.CREATE_ORDER_PAGE, {
                  idOrder: payload,
                });
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
