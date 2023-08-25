import globalStyles from '@src/constants/globalStyles';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import IFontAwsome from 'react-native-vector-icons/FontAwesome';

interface Props {
  rating: number;
}

const Rating: React.FC<Props> = ({rating}) => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      horizontal
      renderItem={({item, index}) => (
        <View key={`${item}-${index}`} style={styles.itemRating}>
          <IFontAwsome
            name="star"
            size={moderateScale(15)}
            color={
              index + 1 <= rating
                ? globalStyles.colors.common.yellow
                : globalStyles.colors.common.darkNavy05
            }
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemRating: {
    flex: 1,
    paddingVertical: moderateScale(20),
    marginHorizontal: moderateScale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default Rating;
