import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import styles from './CreateOrder.Styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import globalStyles from '@src/constants/globalStyles';
import BaseHeader from '@src/components/BaseHeader/BaseHeader';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {moderateScale} from 'react-native-size-matters';
import IFeather from 'react-native-vector-icons/Feather';
import {CreateOrderInterface, FormOrderInterface} from '@src/types/orders';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {createOrder} from '@src/redux/actions/orders';

type Props = NativeStackScreenProps<
  RootStackParamType,
  routesEnum.CREATE_ORDER_PAGE
>;

const CreateOrderPages: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const idOrder = route?.params?.idOrder || {};

  const [modalSelection, setModalSelection] = useState<{
    visible: boolean;
    title: string;
    formId: keyof FormOrderInterface | null;
  }>({
    visible: false,
    title: '',
    formId: null,
  });

  const [form, setForm] = useState<FormOrderInterface>({
    pickupLocation: '',
    dropoffLocation: '',
    dropOffDate: '',
    pickupDate: '',
    pickupTime: '',
  });

  const [showDatePicker, setShowDatePicker] = useState<{
    visible: boolean;
    formId: 'pickupDate' | 'dropOffDate' | 'pickupTime' | '';
  }>({
    visible: false,
    formId: '',
  });

  const handleSelectDate = (date: Date) => {
    const format =
      showDatePicker.formId === 'pickupTime' ? 'HH:mm' : 'DD-MM-YYYY';

    setForm(fm => ({
      ...fm,
      [showDatePicker.formId]: moment(date).format(format),
    }));
    setShowDatePicker({
      visible: false,
      formId: '',
    });
  };

  const handleCreateOrder = useCallback(
    (payload: CreateOrderInterface) => {
      dispatch(createOrder(payload));
    },
    [dispatch],
  );

  const validateButton = useCallback((data: FormOrderInterface) => {
    const isValid = Object.values(data).every(dt => dt);
    return {
      style: {
        backgroundColor: isValid
          ? globalStyles.colors.common.green
          : globalStyles.colors.common.darkNavy02,
      },
      isValid,
    };
  }, []);

  return (
    <SafeAreaView style={globalStyles.layout.rootContainer}>
      <BaseHeader title="Add Order" />
      <ScrollView
        contentContainerStyle={[
          globalStyles.layout.scrollViewContainer,
          styles.spaceBetween,
        ]}>
        <View>
          <Text style={styles.titleSection}>Pick Up Location</Text>
          <Pressable
            style={styles.inputAutoCompleteLocation}
            onPress={() => {
              setModalSelection({
                visible: true,
                title: 'Pick Up Location',
                formId: 'pickupLocation',
              });
            }}>
            {form.pickupLocation ? (
              <Text numberOfLines={1} style={styles.value}>
                {form.pickupLocation?.split('/')[0]}
              </Text>
            ) : (
              <Text style={styles.placeholder}>{'-- Pick Up Location --'}</Text>
            )}
          </Pressable>
          <Text style={styles.titleSection}>Drop Off Location</Text>
          <Pressable
            style={styles.inputAutoCompleteLocation}
            onPress={() => {
              setModalSelection({
                visible: true,
                title: 'Drop Off Location',
                formId: 'dropoffLocation',
              });
            }}>
            {form.dropoffLocation ? (
              <Text numberOfLines={1} style={styles.value}>
                {form.dropoffLocation?.split('/')[0]}
              </Text>
            ) : (
              <Text style={styles.placeholder}>
                {'-- Drop Off Location --'}
              </Text>
            )}
          </Pressable>
          <Text style={styles.titleSection}>Pick Up Date</Text>
          <Pressable
            style={styles.inputAutoCompleteLocation}
            onPress={() => {
              setShowDatePicker({
                visible: true,
                formId: 'pickupDate',
              });
            }}>
            {form.pickupDate ? (
              <Text numberOfLines={1} style={styles.value}>
                {form.pickupDate}
              </Text>
            ) : (
              <Text style={styles.placeholder}>{'-- Pick Up Date --'}</Text>
            )}
          </Pressable>
          <Text style={styles.titleSection}>Pick Up Time</Text>
          <Pressable
            style={styles.inputAutoCompleteLocation}
            onPress={() => {
              setShowDatePicker({
                visible: true,
                formId: 'pickupTime',
              });
            }}>
            {form.pickupTime ? (
              <Text numberOfLines={1} style={styles.value}>
                {form.pickupTime}
              </Text>
            ) : (
              <Text style={styles.placeholder}>{'-- Pick Up Time --'}</Text>
            )}
          </Pressable>
          <Text style={styles.titleSection}>Drop Off Date</Text>
          <Pressable
            style={styles.inputAutoCompleteLocation}
            onPress={() => {
              setShowDatePicker({
                visible: true,
                formId: 'dropOffDate',
              });
            }}>
            {form.dropOffDate ? (
              <Text numberOfLines={1} style={styles.value}>
                {form.dropOffDate}
              </Text>
            ) : (
              <Text style={styles.placeholder}>{'-- Drop Off Date --'}</Text>
            )}
          </Pressable>
        </View>
        <TouchableOpacity
          disabled={!validateButton(form).isValid}
          style={[styles.btnConfirm, validateButton(form).style]}
          onPress={() => {
            handleCreateOrder({
              ...form,
              ...idOrder,
            });
          }}>
          <Text style={styles.txtConfirm}>Confirm</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          locale="id"
          open={showDatePicker.visible}
          date={new Date()}
          minimumDate={new Date()}
          mode={showDatePicker.formId === 'pickupTime' ? 'time' : 'date'}
          onConfirm={handleSelectDate}
          onCancel={() => {
            setShowDatePicker({
              visible: false,
              formId: '',
            });
          }}
        />
        <Modal
          animationType="slide"
          visible={modalSelection.visible}
          onRequestClose={() => {}}>
          <SafeAreaView style={styles.centeredView}>
            <View style={styles.modalView}>
              <>
                <View style={styles.headerModal}>
                  <Text style={styles.modalText}>{modalSelection.title}</Text>
                  <Pressable
                    style={styles.btnCloseModal}
                    onPress={() => {
                      setModalSelection(md => ({...md, visible: false}));
                    }}>
                    <IFeather name="x-circle" size={moderateScale(20)} />
                  </Pressable>
                </View>
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  fetchDetails={true}
                  textInputProps={{
                    style: styles.inputAutoCompleteLocation,
                  }}
                  minLength={1}
                  onPress={(data, details = null) => {
                    const {lat, lng} = details?.geometry?.location || {};
                    setForm(fm => ({
                      ...fm,
                      [modalSelection.formId as string]: `${data.description}/${lat},${lng}`,
                    }));
                  }}
                  query={{
                    key: 'AIzaSyA-ul_47mNLwSkZwhFAKGEsdfcCmSi_c-U',
                    language: 'id',
                  }}
                />
              </>
              <TouchableOpacity
                style={[styles.btnConfirm]}
                onPress={() => {
                  setModalSelection(md => ({...md, visible: false}));
                }}>
                <Text style={styles.txtConfirm}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateOrderPages;
