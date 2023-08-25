import {createReducer} from '@reduxjs/toolkit';
import {BaseCarState} from '@src/types/cars';
import {setCreateCarCallback, setGetCarsCallback} from '../actions/cars';

const baseCarReducer: BaseCarState = {
  createCarCallback: {
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
});

export default carReducer;
