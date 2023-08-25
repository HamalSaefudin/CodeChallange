import {StyleSheet} from 'react-native';
import globalStyles from '@src/constants/globalStyles';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.colors.common.white095,
  },
  loadingTextStyle: {
    marginTop: moderateScale(15),
    fontSize: moderateScale(18),
    color: globalStyles.colors.common.green,
    fontFamily: 'Helvetica',
  },
});
