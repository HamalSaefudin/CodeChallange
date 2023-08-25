import globalStyles from '@src/constants/globalStyles';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  inputStyles: {
    paddingLeft: moderateScale(20),
    paddingVertical: moderateScale(14),
    marginVertical: 0,
  },
  inputCurrencyStyles: {
    paddingLeft: moderateScale(10),
    paddingVertical: moderateScale(14),
    marginVertical: 0,
    letterSpacing: moderateScale(1),
  },
  placeholder: {
    color: globalStyles.colors.common.darkNavy02,
  },
  value: {
    color: globalStyles.colors.common.darkNavy,
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
    fontWeight: '500',
    fontSize: moderateScale(16),
    marginVertical: moderateScale(10),
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
  header: {
    height: '7%',
    paddingLeft: moderateScale(10),
    flexDirection: 'row',
    zIndex: 100,
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  btnBack: {
    position: 'absolute',
    left: moderateScale(10),
    zIndex: 99,
  },
});
