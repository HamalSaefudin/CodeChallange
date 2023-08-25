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

interface AppInputProps extends TextInputProps {
  focusedColor?: string;
  onFocus?: () => void;
  trailingIcon?: JSX.Element;
  leadingIcon?: JSX.Element;
  isError?: boolean;
  errorText?: string;
  containerStyle?: ViewStyle | Array<ViewStyle>;
  style?: TextStyle | Array<TextStyle>;
  inputStyle?: ViewStyle | Array<ViewStyle>;
}

const AppInput = forwardRef<TextInput, AppInputProps>((props, ref) => {
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
        <TextInput
          ref={ref}
          {...props}
          style={[styles.inputStyles, props.inputStyle]}
          placeholderTextColor={
            props.isError
              ? globalStyles.colors.status.error
              : props.placeholderTextColor
          }
        />
        {props.trailingIcon && (
          <View
            style={{
              width: moderateScale(40),
            }}>
            {props.trailingIcon}
          </View>
        )}
      </View>
      {props.isError && <Text style={styles.errorText}>{props.errorText}</Text>}
    </>
  );
});

export default AppInput;

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
  },
});
