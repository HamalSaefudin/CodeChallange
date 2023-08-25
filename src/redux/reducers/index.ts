import authReducer from './auth';
import carReducer from './cars';
import ordersReducer from './orders';
import spinnerReducer from './spinner';

export default {
  auth: authReducer,
  spinner: spinnerReducer,
  car: carReducer,
  orders: ordersReducer,
};
