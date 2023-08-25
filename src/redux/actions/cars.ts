import {createAction} from '@reduxjs/toolkit';
import {
  GET_CARS,
  POST_CREATE_CAR,
  SET_CREATE_CAR_CALLBACK,
  SET_GET_CARS_CALLBACK,
} from '@src/constants/actionList';
import {
  CarDocument,
  CreateCarCallbackInterface,
  FormCarInterface,
} from '@src/types/cars';

export const postCreateCar = createAction<FormCarInterface>(POST_CREATE_CAR);
export const getCars = createAction(GET_CARS);
export const setGetCarsCallback = createAction<CarDocument[] | string>(
  SET_GET_CARS_CALLBACK,
);
export const setCreateCarCallback = createAction<CreateCarCallbackInterface>(
  SET_CREATE_CAR_CALLBACK,
);
