import {BaseCallbackInterface} from './base';

export interface BaseOrdersState {
  getOrdersCallback: GetOrdersCallbackInterface[];
  createOrderCallback: BaseCallbackInterface;
}

export interface CreateOrderInterface extends FormOrderInterface {
  carId: string;
  userId: string;
  id?: string;
}

export interface FormOrderInterface {
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  dropOffDate?: string;
  pickupTime?: string;
}

export interface GetOrdersCallbackInterface {
  carId: string;
  carName: string;
  carType: string;
  dailyRate: string;
  dropOffDate: string;
  dropoffLocation: string;
  fuelType: string;
  hourlyRate: string;
  id: string;
  monthlyRate: string;
  pickupDate: string;
  pickupLocation: string;
  pickupTime: string;
  rating: string;
  userId: string;
}
