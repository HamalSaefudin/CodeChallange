import globalStyles from '@constants/globalStyles';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import IFeather from 'react-native-vector-icons/Feather';
import styles from './FloatingButton.styles';

interface FloatingButtonProps {
  icon?: string;
  onPress?: () => void;
  size?: number;
  position?: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon = 'plus',
  position = {bottom: moderateScale(20), right: moderateScale(15)},
  onPress,
  size,
}) => {
  return (
    <TouchableOpacity style={[styles.container, position]} onPress={onPress}>
      <IFeather
        name={icon}
        size={size}
        color={globalStyles.colors.common.white}
      />
    </TouchableOpacity>
  );
};
export default FloatingButton;
