import {NativeStackScreenProps} from '@react-navigation/native-stack';
import globalStyles from '@src/constants/globalStyles';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import React, {useCallback, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import styles from './SelectOptionsPages.styles';
import {SelectItemInterface} from '@src/types/select';
import IFontAwsome from 'react-native-vector-icons/FontAwesome';
type Props = NativeStackScreenProps<
  RootStackParamType,
  routesEnum.SELECTION_OPTIONS_PAGE
>;

const SelectOptionsPages: React.FC<Props> = ({navigation, route}) => {
  const {params} = route;
  const [selectedRating, setSelectedRating] = useState<SelectItemInterface>({
    label: '',
    value: '',
  });
  const isRating = Boolean(params.title.toLowerCase() === 'rating');

  const renderItem = useCallback(
    ({
      item,
      index,
      isStarsIndicator,
    }: {
      item: SelectItemInterface;
      index: number;
      isStarsIndicator: boolean;
    }) => {
      if (isStarsIndicator) {
        return (
          <Pressable
            onPress={() => {
              setSelectedRating(item);
            }}
            key={`${item.label}-${index}`}
            style={styles.itemRating}>
            <IFontAwsome
              name="star"
              size={moderateScale(50)}
              color={
                index + 1 <= Number(selectedRating.value)
                  ? globalStyles.colors.common.yellow
                  : globalStyles.colors.common.gray
              }
            />
          </Pressable>
        );
      }
      return (
        <Pressable
          onPress={() => {
            params.onSelect(item);
            navigation.goBack();
          }}
          key={`${item.label}-${index}`}
          style={[
            styles.menuItem,
            // eslint-disable-next-line react-native/no-inline-styles
            {borderTopWidth: index > 0 ? 0 : moderateScale(0.5)},
          ]}>
          <Text style={styles.itemTitle}>{item.label}</Text>
        </Pressable>
      );
    },
    [navigation, params, selectedRating],
  );

  return (
    <SafeAreaView
      style={[globalStyles.layout.rootContainer, styles.spaceBetween]}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{`Select ${params.title}`}</Text>
        </View>
        <View style={isRating ? styles.row : null}>
          {params?.options?.map((opt, index) =>
            renderItem({
              item: opt,
              index,
              isStarsIndicator: isRating,
            }),
          )}
        </View>
      </View>
      {isRating && (
        <TouchableOpacity
          style={[
            styles.btnConfirm,
            selectedRating.label !== '' && styles.activeButton,
          ]}
          onPress={() => {
            params.onSelect(selectedRating);
            navigation.goBack();
          }}>
          <Text style={styles.txtConfirm}>Confirm</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default SelectOptionsPages;
