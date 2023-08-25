import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import globalStyles from '@constants/globalStyles';

export default StyleSheet.create({
  container: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40 / 2),
    backgroundColor: globalStyles.colors.common.green,
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
