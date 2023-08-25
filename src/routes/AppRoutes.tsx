import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  RootStackParamType,
  routesEnum,
} from '@src/constants/rootStackParamType';
import CarsPages from '@src/pages/Cars/CarsPages';
import DetailCarsPages from '@src/pages/Cars/DetailCarsPages';
import HomePages from '@src/pages/Home/HomePages';
import LoginPages from '@src/pages/Login/LoginPages';
import OrdersPages from '@src/pages/Orders/OrdersPages';
import SelectOptionsPages from '@src/pages/SelectOptions/SelectOptionsPages';
import React from 'react';

const Stack = createNativeStackNavigator<RootStackParamType>();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={routesEnum.LOGIN_PAGE}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={routesEnum.LOGIN_PAGE} component={LoginPages} />
      <Stack.Screen name={routesEnum.HOME_PAGE} component={HomePages} />
      <Stack.Screen name={routesEnum.CARS_PAGE} component={CarsPages} />
      <Stack.Screen
        name={routesEnum.DETAIL_CARS_PAGE}
        component={DetailCarsPages}
      />
      <Stack.Screen name={routesEnum.ORDERS_PAGE} component={OrdersPages} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={routesEnum.SELECTION_OPTIONS_PAGE}
          component={SelectOptionsPages}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppRoutes;