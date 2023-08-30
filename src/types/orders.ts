import {BaseCallbackInterface} from './base';

export interface BaseOrdersState {
  getOrdersCallback: any;
  createOrderCallback: BaseCallbackInterface;
}

export interface CreateOrderInterface {
  carId: string;
  userId: string;
  id?: string;
}
