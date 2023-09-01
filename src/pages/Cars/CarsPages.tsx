import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppInput from '@src/components/AppInput/AppInput';
import BaseHeader from '@src/components/BaseHeader/BaseHeader';
import CurrencyInput from '@src/components/CurrencyInput/CurrencyInput';
import Spacer from '@src/components/Spacer/Spacer';
import formOptions from '@src/constants/formOptions';
import globalStyles from '@src/constants/globalStyles';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import {postCreateCar} from '@src/redux/actions/cars';
import {RootState} from '@src/redux/store';
import {FormCarInterface} from '@src/types/cars';
import {SelectItemInterface} from '@src/types/select';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import styles from './CarsPages.styles';

type Props = NativeStackScreenProps<RootStackParamType, routesEnum.CARS_PAGE>;

const CarsPages: React.FC<Props> = ({navigation, route}) => {
  const totalCars = route?.params?.totalCars || 0;
  const formCars = route?.params?.formCar;

  const dispatch = useDispatch();
  const createCarCallback = useSelector(
    (state: RootState) => state?.car?.createCarCallback,
  );

  const [form, setForm] = useState<FormCarInterface>({
    carName: '',
    carType: '',
    fuelType: '',
    rating: '',
    hourlyRate: '',
    dailyRate: '',
    monthlyRate: '',
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setForm({
      carName: formCars?.carName || '',
      carType: formCars?.carType || '',
      fuelType: formCars?.fuelType || '',
      rating: formCars?.rating || '',
      hourlyRate: formCars?.hourlyRate || '',
      dailyRate: formCars?.dailyRate || '',
      monthlyRate: formCars?.monthlyRate || '',
    });
  }, [formCars]);

  useEffect(() => {
    if (createCarCallback.isFailed) {
      setIsError(true);
      return;
    }
  }, [createCarCallback]);

  const handleMenuSelection = useCallback(
    ({
      title,
      options,
      formTitle,
    }: {
      title: string;
      options: SelectItemInterface[];
      formTitle: string;
    }) => {
      navigation.navigate(routesEnum.SELECTION_OPTIONS_PAGE, {
        title: title,
        options,
        onSelect: (res: SelectItemInterface) => {
          setForm(fm => ({
            ...fm,
            [formTitle]: res.value,
          }));
        },
      });
    },
    [navigation],
  );

  const validateButton = useCallback((data: FormCarInterface) => {
    const isRateValid =
      Number(data.hourlyRate) < Number(data.dailyRate) &&
      Number(data.dailyRate) < Number(data.monthlyRate) &&
      Number(data.hourlyRate) < Number(data.monthlyRate);

    const isValid = Object.values(data).every(dt => dt) && isRateValid;
    return {
      style: {
        backgroundColor: isValid
          ? globalStyles.colors.common.green
          : globalStyles.colors.common.darkNavy02,
      },
      isValid,
    };
  }, []);

  const saveData = useCallback(
    (data: FormCarInterface) => {
      const id = !formCars ? `${totalCars + 1}` : formCars?.id;
      dispatch(postCreateCar({...data, id, isEdit: Boolean(formCars)}));
    },
    [dispatch, formCars, totalCars],
  );

  return (
    <SafeAreaView style={globalStyles.layout.rootContainer}>
      <BaseHeader title="Add New Car" />
      <ScrollView
        contentContainerStyle={[
          globalStyles.layout.scrollViewContainer,
          styles.spaceBetween,
        ]}>
        <View>
          <Text style={styles.titleSection}>Car Names</Text>
          <AppInput
            isError={isError}
            placeholder="-- Input Car Name --"
            onChangeText={(text: string) => {
              setForm(f => ({...f, carName: text}));
            }}
            value={form.carName}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputStyles}
            blurOnSubmit
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
          <Text style={styles.titleSection}>Car Type</Text>
          <Pressable
            style={styles.menuSelection}
            onPress={() => {
              handleMenuSelection({
                title: 'Car Type',
                options: formOptions.carType,
                formTitle: 'carType',
              });
            }}>
            {form.carType ? (
              <Text style={styles.value}>{form.carType}</Text>
            ) : (
              <Text style={styles.placeholder}>{'-- Car Type --'}</Text>
            )}
          </Pressable>
          <Text style={styles.titleSection}>Rating</Text>
          <Pressable
            style={styles.menuSelection}
            onPress={() => {
              handleMenuSelection({
                title: 'Rating',
                options: formOptions.rating,
                formTitle: 'rating',
              });
            }}>
            {form.rating ? (
              <Text style={styles.value}>{form.rating}</Text>
            ) : (
              <Text style={styles.placeholder}>{'-- Rating --'}</Text>
            )}
          </Pressable>
          <Text style={styles.titleSection}>Fuel</Text>
          <Pressable
            style={styles.menuSelection}
            onPress={() => {
              handleMenuSelection({
                title: 'Fuel Type',
                options: formOptions.fuelType,
                formTitle: 'fuelType',
              });
            }}>
            {form.fuelType ? (
              <Text style={styles.value}>{form.fuelType}</Text>
            ) : (
              <Text style={styles.placeholder}>{'-- Fuel Type --'}</Text>
            )}
          </Pressable>
          <Text style={styles.titleSection}>Hour Rate</Text>
          <CurrencyInput
            placeholder="10"
            isError={isError}
            onChangeText={(text: string) => {
              setForm(f => ({...f, hourlyRate: `${text}000`}));
            }}
            value={form?.hourlyRate?.slice(0, -3)}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputCurrencyStyles}
            blurOnSubmit
            maxLength={2}
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
          <Text style={styles.titleSection}>Day Rate</Text>
          <CurrencyInput
            placeholder="100"
            isError={isError}
            onChangeText={(text: string) => {
              setForm(f => ({...f, dailyRate: `${text}000`}));
            }}
            value={form?.dailyRate?.slice(0, -3)}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputCurrencyStyles}
            blurOnSubmit
            maxLength={3}
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
          <Text style={styles.titleSection}>Month Rate</Text>
          <CurrencyInput
            placeholder="100"
            isError={isError}
            value={form?.monthlyRate?.slice(0, -3)}
            onChangeText={(text: string) => {
              setForm(f => ({...f, monthlyRate: `${text}000`}));
            }}
            containerStyle={styles.inputContainerStyles}
            inputStyle={styles.inputCurrencyStyles}
            blurOnSubmit
            maxLength={3}
            style={styles.inputStyles}
            placeholderTextColor={globalStyles.colors.common.darkNavy02}
          />
        </View>
        <Spacer height={moderateScale(50)} />
        <TouchableOpacity
          disabled={!validateButton(form).isValid}
          style={[styles.btnSubmit, validateButton(form).style]}
          onPress={() => {
            saveData(form);
          }}>
          <Text style={styles.txtSubmit}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CarsPages;
