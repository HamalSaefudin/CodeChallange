import globalStyles from '@src/constants/globalStyles';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  imageWrapper: {
    height: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
    // resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: globalStyles.colors.common.black,
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99,
  },
  btnBack: {
    position: 'absolute',
    left: moderateScale(10),
    top: '8%',
    zIndex: 100,
  },
  contentContainerStyle: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(22),
    color: globalStyles.colors.common.darkNavy,
  },
  priceText: {
    fontWeight: '400',
    fontSize: moderateScale(12),
    color: globalStyles.colors.common.darkNavy05,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: moderateScale(10),
    color: globalStyles.colors.common.darkNavy05,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    flex: 1,
  },
  flex1: {flex: 1},
  btnConfirm: {
    paddingVertical: moderateScale(10),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: globalStyles.colors.status.ok,
    backgroundColor: globalStyles.colors.common.green,
    borderRadius: moderateScale(15),
  },
  btnEdit: {
    paddingVertical: moderateScale(10),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: globalStyles.colors.common.yellow,
    borderRadius: moderateScale(15),
  },
  btnDelete: {
    paddingVertical: moderateScale(10),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: globalStyles.colors.status.error,
    borderRadius: moderateScale(15),
  },
  txtEdit: {
    color: globalStyles.colors.common.darkNavy05,
    fontWeight: 'bold',
  },
  txtDelete: {
    color: globalStyles.colors.status.error,
    fontWeight: 'bold',
  },
  txtConfirm: {
    color: globalStyles.colors.common.white,
    fontWeight: 'bold',
  },
});