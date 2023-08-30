import {Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const globalStyles = {
  colors: {
    common: {
      black: 'rgb(0, 0, 0)', //#000000
      white: 'rgb(255, 255, 255)',
      white095: 'rgba(255, 255, 255, 0.95)',
      gray: 'rgba(236, 242, 249, 1)',
      green: 'rgba(72, 180, 132, 1)',
      darkNavy: 'rgba(32, 33, 55, 1)',
      darkNavy05: 'rgba(32, 33, 55, 0.5)',
      darkNavy02: 'rgba(32, 33, 55, 0.2)',
      yellow: 'rgba(253, 204, 13, 1)',
    },
    status: {
      error: 'rgb(237, 68, 68)',
      warning: 'rgb(229, 193, 77)',
      ok: 'rgb(98, 172, 154)',
    },
  },
  layout: {
    rootContainer: {
      flex: 1,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    padding: {
      paddingHorizontal: moderateScale(16),
    },
    scrollViewContainer: {
      paddingHorizontal: moderateScale(16),
      flexGrow: 1,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'dark-content',
    },
    window: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    screen: {
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
    },
  },
  font: {
    regular: {
      fontFamily: 'Roboto-Regular',
    },
    bold: {
      fontFamily: 'Roboto-Bold',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
    },
  },
};

export default globalStyles;
