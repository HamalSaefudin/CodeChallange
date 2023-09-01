import globalStyles from '@src/constants/globalStyles';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  inputStyles: {
    paddingLeft: moderateScale(20),
    paddingVertical: moderateScale(14),
    marginVertical: 0,
    ...globalStyles.font.regular,
  },
  inputCurrencyStyles: {
    paddingLeft: moderateScale(10),
    paddingVertical: moderateScale(14),
    marginVertical: 0,
    letterSpacing: moderateScale(1),
    ...globalStyles.font.regular,
  },
  placeholder: {
    color: globalStyles.colors.common.darkNavy02,
    ...globalStyles.font.medium,
  },
  value: {
    color: globalStyles.colors.common.darkNavy,
    ...globalStyles.font.medium,
  },
  spaceBetween: {
    justifyContent: 'space-between',
    paddingBottom: moderateScale(20),
  },
  inputContainerStyles: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: globalStyles.colors.common.darkNavy02,
    paddingVertical: 0,
  },
  titleSection: {
    fontSize: moderateScale(16),
    marginVertical: moderateScale(10),
    ...globalStyles.font.medium,
  },
  menuSelection: {
    borderWidth: 1,
    borderColor: globalStyles.colors.common.darkNavy02,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(15),
    paddingLeft: moderateScale(10),
  },
  btnSubmit: {
    backgroundColor: globalStyles.colors.common.darkNavy05,
    paddingVertical: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(15),
  },
  txtSubmit: {
    fontWeight: 'bold',
    color: globalStyles.colors.common.gray,
    letterSpacing: 1,
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
});
