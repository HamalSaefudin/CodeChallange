import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import globalStyles from '@src/constants/globalStyles';
import {goBack} from '@src/routes/indexRoutes';
import IIonIcons from 'react-native-vector-icons/Ionicons';

interface BaseHeaderProps {
  title: string;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({title}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => {
          goBack();
        }}>
        <IIonIcons
          name="arrow-back-circle-outline"
          size={moderateScale(36)}
          color={globalStyles.colors.common.darkNavy05}
        />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={[styles.titleSection, globalStyles.font.bold]}>
          {title}
        </Text>
      </View>
    </View>
  );
};
export default BaseHeader;

const styles = StyleSheet.create({
  header: {
    height: '7%',
    paddingLeft: moderateScale(10),
    flexDirection: 'row',
    zIndex: 100,
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  btnBack: {
    position: 'absolute',
    left: moderateScale(10),
    zIndex: 99,
  },
  titleSection: {
    fontSize: moderateScale(16),
    marginVertical: moderateScale(10),
    ...globalStyles.font.medium,
  },
});
