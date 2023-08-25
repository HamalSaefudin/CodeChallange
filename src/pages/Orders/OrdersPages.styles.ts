import globalStyles from '@src/constants/globalStyles';
import {generateShadow} from '@src/utils/generateShadow';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  header: {
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.colors.common.white,
  },
  title: {
    color: globalStyles.colors.common.darkNavy,
    fontWeight: 'bold',
    fontSize: moderateScale(22),
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
  goBack: {
    position: 'absolute',
    left: 0,
    padding: moderateScale(20),
  },
  containerNoItem: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: globalStyles.layout.screen.height / 4,
  },
  txtNoItem: {
    fontWeight: 'bold',
    color: globalStyles.colors.common.darkNavy05,
    marginTop: moderateScale(10),
  },
});
