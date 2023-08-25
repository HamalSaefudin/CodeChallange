import React, {ReactNode} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';

import styles from './AppModal.styles';

type AppModalProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  onRequestClose?: () => void;
};

const AppModal = (props: AppModalProps) => {
  const {children, style, visible = false, onRequestClose} = props;
  if (!visible) {
    return null;
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.modal, style]}
      onPress={onRequestClose}>
      {children}
    </TouchableOpacity>
  );
};

export default AppModal;
