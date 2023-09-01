import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import imagePath from '@src/constants/imagePath';
import {getOrders} from '@src/redux/actions/orders';
import {RootState} from '@src/redux/store';
import {goBack} from '@src/routes/indexRoutes';
import {GetOrdersCallbackInterface} from '@src/types/orders';
import {currencyFormat} from '@src/utils/utils';
import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import IIonIcons from 'react-native-vector-icons/Ionicons';
import IMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import styles from './OrdersPages.styles';

const OrdersPages = () => {
  const dispatch = useDispatch();
  const data: GetOrdersCallbackInterface[] = useSelector(
    (state: RootState) => state.orders.getOrdersCallback,
  );

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

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

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
                <View
                  style={[
                    styles.alignSelfCenter,
                    {marginRight: moderateScale(30)},
                  ]}>
                  <Text
                    style={[
                      globalStyles.font.bold,
                      {fontSize: moderateScale(18)},
                    ]}>
                    {item.carName}
                  </Text>
                  <Text
                    style={[
                      globalStyles.font.regular,
                      {fontSize: moderateScale(12)},
                    ]}>
                    Type {item.carType}
                  </Text>
                  <Spacer height={moderateScale(40)} />
                  <View style={{marginTop: moderateScale(10)}}>
                    <Text style={globalStyles.font.regular}>
                      {`${item.pickupDate}`}
                    </Text>
                  </View>
                </View>
                <View style={styles.alignItemsCenter}>
                  <View style={styles.alignItemsCenter}>
                    <Text style={globalStyles.font.regular}>Pick Up</Text>
                    <Text style={globalStyles.font.regular}>
                      {item.pickupLocation.split(',')[0]}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: moderateScale(40),
                      width: moderateScale(3),
                      backgroundColor: globalStyles.colors.common.green,
                      borderRadius: moderateScale(40),
                    }}
                  />
                  <View style={styles.alignItemsCenter}>
                    <Text style={globalStyles.font.regular}>Drop Off</Text>
                    <Text style={globalStyles.font.regular}>
                      {item.dropoffLocation.split(',')[0]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OrdersPages;
