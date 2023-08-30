import {createReducer} from '@reduxjs/toolkit';
import {BaseCarState} from '@src/types/cars';
import {
  setCreateCarCallback,
  setDeleteCarCallback,
  setGetCarsCallback,
} from '../actions/cars';

const baseCarReducer: BaseCarState = {
  createCarCallback: {
    isFailed: false,
    isSuccess: false,
  },
  deleteCarCallback: {
    isFailed: false,
    isSuccess: false,
  },
  cars: [],
};

const carReducer = createReducer(baseCarReducer, builder => {
  builder.addCase(setCreateCarCallback, (state, {payload}) => ({
    ...state,
    createCarCallback: payload,
  }));
  builder.addCase(setGetCarsCallback, (state, {payload}) => ({
    ...state,
    cars: payload,
  }));

  builder.addCase(setDeleteCarCallback, (state, {payload}) => ({
    ...state,
    deleteCarCallback: payload,
  }));
});

export default carReducer;
