import Rating from '@src/components/Rating/Rating';
import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import imagePath from '@src/constants/imagePath';
import {getOrders} from '@src/redux/actions/orders';
import {RootState} from '@src/redux/store';
import {goBack} from '@src/routes/indexRoutes';
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
  const data = useSelector(
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
                <View>
                  <Text style={globalStyles.font.regular}>{item.carName}</Text>
                  <Text style={globalStyles.font.regular}>
                    Type {item.carType}
                  </Text>
                  <Text style={globalStyles.font.regular}>
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
