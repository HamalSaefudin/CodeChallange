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
    fontSize: moderateScale(22),
    ...globalStyles.font.bold,
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
    marginRight: moderateScale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
  },
  detailInfo: {
    flexDirection: 'row',
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
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
});
