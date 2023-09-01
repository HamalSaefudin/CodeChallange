import globalStyles from '@src/constants/globalStyles';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  spaceBetween: {
    justifyContent: 'space-between',
    paddingBottom: moderateScale(20),
  },
  titleSection: {
    fontSize: moderateScale(16),
    marginVertical: moderateScale(10),
    ...globalStyles.font.medium,
  },
  inputAutoCompleteLocation: {
    borderWidth: 1,
    paddingVertical: moderateScale(15),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(5),
    borderColor: globalStyles.colors.common.darkNavy02,
    borderRadius: moderateScale(10),
    width: '100%',
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    alignItems: 'center',
    flex: 1,
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  modalText: {
    ...globalStyles.font.medium,
  },
  headerModal: {
    paddingVertical: moderateScale(10),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(15),
  },
  btnCloseModal: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    padding: moderateScale(10),
  },
  btnConfirm: {
    backgroundColor: globalStyles.colors.common.green,
    paddingVertical: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(20),
    width: '100%',
  },
  txtConfirm: {
    color: globalStyles.colors.common.white,
    fontSize: moderateScale(16),
    letterSpacing: moderateScale(1),
    ...globalStyles.font.medium,
  },
  placeholder: {
    color: globalStyles.colors.common.darkNavy02,
    ...globalStyles.font.medium,
  },
  value: {
    color: globalStyles.colors.common.darkNavy,
    ...globalStyles.font.medium,
  },
});
