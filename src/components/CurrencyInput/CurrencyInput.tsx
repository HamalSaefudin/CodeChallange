import globalStyles from '@src/constants/globalStyles';
import React, {forwardRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

interface CurrencyInputProps extends TextInputProps {
  focusedColor?: string;
  onFocus?: () => void;
  isError?: boolean;
  errorText?: string;
  containerStyle?: ViewStyle | Array<ViewStyle>;
  style?: TextStyle | Array<TextStyle>;
  inputStyle?: ViewStyle | Array<ViewStyle>;
}

const CurrencyInput = forwardRef<TextInput, CurrencyInputProps>(
  (props, ref) => {
    const getBorderColor = (isError: boolean): ViewStyle => {
      if (isError) {
        return {
          borderColor: globalStyles.colors.status.error,
          borderBottomWidth: moderateScale(2),
          paddingLeft: moderateScale(10),
        };
      }

      return {
        borderColor: globalStyles.colors.common.darkNavy,
        borderBottomWidth: moderateScale(1),
      };
    };

    return (
      <>
        <View
          style={[
            styles.container,
            getBorderColor(Boolean(props.isError)),
            props.containerStyle,
          ]}>
          <View style={styles.leadingIcon}>
            <Text style={styles.leadingText}>Rp.</Text>
          </View>
          <TextInput
            ref={ref}
            {...props}
            keyboardType="number-pad"
            style={[styles.inputStyles, props.inputStyle]}
            placeholderTextColor={
              props.isError
                ? globalStyles.colors.status.error
                : props.placeholderTextColor
            }
          />
          <View style={styles.trailingIcon}>
            <Text style={styles.trailingText}>.000,00</Text>
          </View>
        </View>
        {props.isError && (
          <Text style={styles.errorText}>{props.errorText}</Text>
        )}
      </>
    );
  },
);

export default CurrencyInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: globalStyles.colors.status.error,
    fontWeight: 'bold',
  },
  inputStyles: {
    flex: 1,
    marginVertical: moderateScale(15),
    marginLeft: moderateScale(40),
  },
  leadingIcon: {
    position: 'absolute',
    height: '100%',
    width: moderateScale(40),
    backgroundColor: globalStyles.colors.common.gray,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    left: 0,
  },
  leadingText: {textAlign: 'center', fontWeight: 'bold'},
  trailingIcon: {
    position: 'absolute',
    height: '100%',
    width: '75%',
    backgroundColor: globalStyles.colors.common.gray,
    justifyContent: 'center',
    zIndex: 99,
    right: 0,
    paddingLeft: moderateScale(10),
  },
  trailingText: {fontWeight: 'bold'},
});
