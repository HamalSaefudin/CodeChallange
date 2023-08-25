import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import styles from './Spinner.styles';
import AppModal from '../AppModal/AppModal';
import globalStyles from '@src/constants/globalStyles';

type SpinnerProps = {
  show?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Spinner = (props: SpinnerProps) => {
  const {show = false, style} = props;
  return show ? (
    <AppModal visible={show}>
      <View style={style ? style : styles.modalBackground}>
        <ActivityIndicator
          size="large"
          color={globalStyles.colors.common.green}
        />
        <Text style={styles.loadingTextStyle} testID="testid-labelText">
          Loading...
        </Text>
      </View>
    </AppModal>
  ) : (
    <></>
  );
};

export default Spinner;
