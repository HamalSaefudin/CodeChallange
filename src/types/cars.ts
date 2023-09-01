import {BaseCallbackInterface} from './base';

export interface BaseCarState {
  createCarCallback: CreateCarCallbackInterface;
  cars: CarDocument[] | string;
  deleteCarCallback?: BaseCallbackInterface;
}
export interface FormCarInterface {
  carType: string;
  fuelType: string;
  rating: string;
  hourlyRate: string;
  dailyRate: string;
  monthlyRate: string;
  id?: string;
  carName: string;
  isEdit?: boolean;
  uriIcon: string;
}

export interface CreateCarCallbackInterface {
  isSuccess?: boolean;
  isFailed?: boolean;
}

export interface CarDocument {
  carName: string;
  carType: string;
  dailyRate: string;
  fuelType: string;
  hourlyRate: string;
  id: string;
  monthlyRate: string;
  rating: string;
  totalOrders?: number;
  uriIcon: string;
}
