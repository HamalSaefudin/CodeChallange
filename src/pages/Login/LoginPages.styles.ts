import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import globalStyles from '@src/constants/globalStyles';

const Styles = StyleSheet.create({
  imageContainer: {
    height: Dimensions.get('screen').height / 2,
  },
  title: {
    fontSize: moderateScale(24),
    textAlign: 'center',
    marginBottom: moderateScale(25),
    ...globalStyles.font.regular,
  },
  formContainer: {
    flex: 1,
    margin: moderateScale(20),
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(20),
    padding: moderateScale(25),
    borderColor: globalStyles.colors.common.darkNavy05,
    justifyContent: 'space-evenly',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  inputStyles: {
    color: globalStyles.colors.common.darkNavy,
    fontWeight: '500',
  },
  btnLogin: {
    backgroundColor: globalStyles.colors.common.darkNavy05,
    paddingVertical: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(15),
  },
  txtLogin: {
    fontWeight: 'bold',
    color: globalStyles.colors.common.gray,
    letterSpacing: 1,
  },
});
export default Styles;
