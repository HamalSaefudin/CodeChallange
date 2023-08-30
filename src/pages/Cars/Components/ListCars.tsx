import Rating from '@src/components/Rating/Rating';
import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import imagePath from '@src/constants/imagePath';
import {routesEnum} from '@src/constants/rootStackParamType';
import {navigate} from '@src/routes/indexRoutes';
import {CarDocument} from '@src/types/cars';
import {generateShadow} from '@src/utils/generateShadow';
import {currencyFormat} from '@src/utils/utils';
import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import IFontAwsome6 from 'react-native-vector-icons/FontAwesome6';
import IMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface Props {
  data?: CarDocument[];
  totalOrders?: number;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ListCars: React.FC<Props> = ({data, totalOrders = 0}) => {
  const renderSpacer = useCallback(
    () => <Spacer height={moderateScale(10)} />,
    [],
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>Our Cars</Text>
        <Pressable
          style={styles.shoppingCart}
          onPress={() => {
            navigate(routesEnum.ORDERS_PAGE);
          }}>
          <IFontAwsome6
            name="basket-shopping"
            size={moderateScale(20)}
            color={globalStyles.colors.common.green}
          />
          {totalOrders > 0 && (
            <View style={styles.shoppingCartIndicator}>
              <Text
                style={{
                  fontSize: moderateScale(8),
                  color: globalStyles.colors.common.white,
                  ...globalStyles.font.regular,
                }}>
                {totalOrders}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    ),
    [totalOrders],
  );

  const renderNoItem = useCallback(
    () => (
      <View style={styles.containerNoItem}>
        <IMaterialCommunityIcons
          name="car"
          size={moderateScale(80)}
          color={globalStyles.colors.common.darkNavy05}
        />
        <Text style={styles.txtNoItem}>No Cars Available</Text>
      </View>
    ),
    [],
  );

  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={renderSpacer}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderNoItem}
      renderItem={({item, index}) => (
        <AnimatedTouchableOpacity
          onPress={() => {
            navigate(routesEnum.DETAIL_CARS_PAGE, {...item, totalOrders});
          }}
          entering={SlideInDown.delay(index * 360)}
          style={styles.itemContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={imagePath.DEFAULT_CAR_ILLUSTRATION}
              style={styles.image}
            />
          </View>
          <View style={styles.detailInfo}>
            <View>
              <Text style={globalStyles.font.regular}>{item.carName}</Text>
              <Text style={globalStyles.font.regular}>Type {item.carType}</Text>
              <Text style={globalStyles.font.regular}>
                {currencyFormat(Number(item.hourlyRate), 'symbol')} / Hour
              </Text>
            </View>
            <Rating rating={Number(item.rating)} />
          </View>
        </AnimatedTouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(20),
    borderWidth: 1,
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    borderColor: globalStyles.colors.common.darkNavy,
    backgroundColor: globalStyles.colors.common.white095,
    ...generateShadow(8, globalStyles.colors.common.darkNavy as string),
  },
  imageWrapper: {
    height: moderateScale(100),
    width: moderateScale(100),
    marginRight: moderateScale(20),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
  },
  detailInfo: {
    justifyContent: 'space-between',
  },
  header: {
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.common.white,
  },
  title: {
    color: globalStyles.colors.common.darkNavy,
    fontSize: moderateScale(22),
    fontFamily: 'Roboto-Bold',
  },
  shoppingCart: {
    position: 'absolute',
    right: '5%',
    padding: moderateScale(20),
  },
  shoppingCartIndicator: {
    height: moderateScale(15),
    width: moderateScale(15),
    backgroundColor: globalStyles.colors.status.error,
    position: 'absolute',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 18,
    left: 22,
  },
  containerNoItem: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: globalStyles.layout.screen.height / 4,
  },
  txtNoItem: {
    color: globalStyles.colors.common.darkNavy05,
    marginTop: moderateScale(10),
    ...globalStyles.font.bold,
  },
});

export default ListCars;
