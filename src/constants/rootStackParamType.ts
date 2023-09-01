import {CarDocument} from '@src/types/cars';
import {CreateOrderInterface} from '@src/types/orders';

export enum routesEnum {
  LOGIN_PAGE = 'Login_Page',
  HOME_PAGE = 'Home_Page',
  CARS_PAGE = 'Cars_Page',
  DETAIL_CARS_PAGE = 'Detail_Cars_Page',
  SELECTION_OPTIONS_PAGE = 'Select_Options_Page',
  ORDERS_PAGE = 'Orders_Page',
  CREATE_ORDER_PAGE = 'CREATE_ORDER_PAGE',
}

export type RootStackParamType = {
  [routesEnum.LOGIN_PAGE]: undefined;
  [routesEnum.HOME_PAGE]: undefined;
  [routesEnum.CARS_PAGE]: {
    totalCars?: number;
    formCar?: CarDocument;
  };
  [routesEnum.SELECTION_OPTIONS_PAGE]: {
    title: string;
    options: Array<{label: string; value: string}>;
    onSelect: (payload: {label: string; value: string}) => void;
  };
  [routesEnum.DETAIL_CARS_PAGE]: CarDocument;
  [routesEnum.ORDERS_PAGE]: undefined;
  [routesEnum.CREATE_ORDER_PAGE]: {
    idOrder: CreateOrderInterface;
  };
};
