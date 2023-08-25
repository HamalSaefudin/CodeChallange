import {
  CommonActions,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {RootStackParamType} from '@src/constants/rootStackParamType';
import React from 'react';
import AppRoutes from './AppRoutes';
import SplashScreen from 'react-native-splash-screen';

export const navigationRef = createNavigationContainerRef<RootStackParamType>();

export const navigate = (
  name: keyof RootStackParamType,
  params?: RootStackParamType[keyof RootStackParamType],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
};

export const resetNavigationRef = (
  name: keyof RootStackParamType,
  params?: object,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params}],
      }),
    );
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
};

const Router = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        SplashScreen.hide();
      }}>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default Router;
