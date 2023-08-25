import globalStyles from '@src/constants/globalStyles';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  spaceBetween: {
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginVertical: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: globalStyles.colors.common.darkNavy,
  },
  menuItem: {
    paddingVertical: moderateScale(20),
    paddingLeft: moderateScale(20),
    borderBottomWidth: moderateScale(0.5),
    borderColor: globalStyles.colors.common.darkNavy02,
    marginBottom: moderateScale(10),
  },
  itemTitle: {
    fontWeight: '500',
    fontSize: moderateScale(18),
    color: globalStyles.colors.common.darkNavy05,
  },
  row: {
    flexDirection: 'row',
  },
  itemRating: {
    flex: 1,
    paddingVertical: moderateScale(20),
    marginHorizontal: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirm: {
    backgroundColor: globalStyles.colors.common.gray,
    paddingVertical: moderateScale(20),
    marginHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  txtConfirm: {
    color: globalStyles.colors.common.white,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    letterSpacing: moderateScale(1),
  },
  activeButton: {
    backgroundColor: globalStyles.colors.common.green,
  },
});
