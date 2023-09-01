import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppInput from '@src/components/AppInput/AppInput';
import Spacer from '@src/components/Spacer/Spacer';
import globalStyles from '@src/constants/globalStyles';
import imagePath from '@src/constants/imagePath';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import {postLogin} from '@src/redux/actions/auth';
import {RootState} from '@src/redux/store';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import IFeather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './LoginPages.styles';

type Props = NativeStackScreenProps<RootStackParamType, routesEnum.LOGIN_PAGE>;

const LoginPages: React.FC<Props> = ({navigation}) => {
  const [form, setForm] = useState<{username: string; password: string}>({
    username: '',
    password: '',
  });
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorUsername, setErrorUsername] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  const loginCallback = useSelector(
    (state: RootState) => state?.auth?.loginCallback,
  );

  const handleContinue = useCallback(() => {
    if (!form.username) {
      setErrorUsername('Wajib diisi');
    }
    if (!form.password) {
      setErrorPassword('Wajib diisi');
    }
    dispatch(postLogin(form));
  }, [dispatch, form]);

  useEffect(() => {
    if (typeof loginCallback === 'string') {
      setErrorUsername(loginCallback);
      setErrorPassword(loginCallback);
      return;
    }
    if (typeof loginCallback === 'object') {
      navigation.replace(routesEnum.HOME_PAGE);
      return;
    }
    return;
  }, [loginCallback, navigation]);

  return (
    <SafeAreaView style={globalStyles.layout.rootContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.imageContainer}>
          <Image source={imagePath.LOGIN_ILLUSTRATION} style={Styles.image} />
        </View>
        <View style={Styles.formContainer}>
          <View>
            <Text style={Styles.title}>Login</Text>
            <AppInput
              placeholder="Username"
              onChangeText={(text: string) => {
                setForm(f => ({...f, username: text}));
              }}
              onKeyPress={() => {}}
              isError={Boolean(errorUsername)}
              errorText={errorUsername}
              style={Styles.inputStyles}
              placeholderTextColor={globalStyles.colors.common.darkNavy}
            />
            <Spacer height={moderateScale(20)} />
            <AppInput
              placeholder="Password"
              onKeyPress={() => {}}
              onChangeText={(text: string) => {
                setForm(f => ({...f, password: text}));
              }}
              trailingIcon={
                <Pressable
                  onPress={() => {
                    setShowPassword(sp => !sp);
                  }}>
                  <IFeather
                    name={showPassword ? 'eye' : 'eye-off'}
                    color={globalStyles.colors.common.darkNavy}
                    size={moderateScale(24)}
                  />
                </Pressable>
              }
              style={Styles.inputStyles}
              secureTextEntry={!showPassword}
              errorText={errorPassword}
              isError={Boolean(errorPassword)}
              placeholderTextColor={globalStyles.colors.common.darkNavy}
            />
            <Spacer height={moderateScale(20)} />
          </View>
          <TouchableOpacity style={Styles.btnLogin} onPress={handleContinue}>
            <Text style={Styles.txtLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPages;
