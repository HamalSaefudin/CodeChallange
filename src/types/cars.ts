export interface BaseCarState {
  createCarCallback: CreateCarCallbackInterface;
  cars: CarDocument[] | string;
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
}