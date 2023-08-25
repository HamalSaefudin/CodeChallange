import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import styles from './OrdersPages.styles';
import globalStyles from '@src/constants/globalStyles';
import {FlatList} from 'react-native';
import Spacer from '@src/components/Spacer/Spacer';
import {moderateScale} from 'react-native-size-matters';
import imagePath from '@src/constants/imagePath';
import {goBack} from '@src/routes/indexRoutes';
import IIonIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoading, showLoading} from '@src/redux/actions/spinner';
import firestore from '@react-native-firebase/firestore';
import {RootState} from '@src/redux/store';
import {currencyFormat} from '@src/utils/utils';
import Rating from '@src/components/Rating/Rating';
import IMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrdersPages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.loginCallback.user);

  const [data, setData] = useState<any>([]);

  const renderSpacer = useCallback(
    () => <Spacer height={moderateScale(10)} />,
    [],
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>Your Orders</Text>
        <Pressable
          style={styles.goBack}
          onPress={() => {
            goBack();
          }}>
          <IIonIcons
            name="arrow-back-circle-outline"
            size={moderateScale(36)}
            color={globalStyles.colors.common.black}
          />
        </Pressable>
      </View>
    ),
    [],
  );

  const renderNoItem = useCallback(
    () => (
      <View style={styles.containerNoItem}>
        <IMaterialCommunityIcons
          name="cart-off"
          size={moderateScale(80)}
          color={globalStyles.colors.common.darkNavy05}
        />
        <Text style={styles.txtNoItem}>No Orders Yet ...</Text>
      </View>
    ),
    [],
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
            firestore()
              .collection('cars_collection')
              .where('id', '==', doc?.data()?.carId)
              .get()
              .then((car: any) => {
                car.forEach((cr: any) => {
                  console.log(cr?.data());
                  documents.push({...doc.data(), ...cr?.data()});
                });
                setData(documents);
              });
          });
        })
        .catch(e => console.log(e, 'er'))
        .finally(() => {
          dispatch(hideLoading());
        });
    },
    [dispatch],
  );

  useEffect(() => {
    getOrders(user.uid);
  }, [getOrders, user]);

  return (
    <SafeAreaView style={globalStyles.layout.rootContainer}>
      <FlatList
        data={data}
        ItemSeparatorComponent={renderSpacer}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderNoItem}
        renderItem={({item}) => (
          <View>
            <View style={styles.itemContainer}>
              <View style={styles.imageWrapper}>
                <Image
                  source={imagePath.DEFAULT_CAR_ILLUSTRATION}
                  style={styles.image}
                />
              </View>
              <View style={styles.detailInfo}>
                <View>
                  <Text>{item.carName}</Text>
                  <Text>Type {item.carType}</Text>
                  <Text>
                    {currencyFormat(Number(item.hourlyRate), 'symbol')} / Hour
                  </Text>
                </View>
                <Rating rating={Number(item.rating)} />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OrdersPages;
