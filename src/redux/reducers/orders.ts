import {createReducer} from '@reduxjs/toolkit';
import {BaseOrdersState} from '@src/types/orders';
import {setCreateOrderCallback, setGetOrdersCallback} from '../actions/orders';

const baseOrderReducer: BaseOrdersState = {
  getOrdersCallback: [],
  createOrderCallback: {
    isSuccess: false,
    isFailed: false,
  },
};

const ordersReducer = createReducer(baseOrderReducer, builder => {
  builder.addCase(setGetOrdersCallback, (state, {payload}) => ({
    ...state,
    getOrdersCallback: payload,
  }));
  builder.addCase(setCreateOrderCallback, (state, {payload}) => ({
    ...state,
    createOrderCallback: payload,
  }));
});

export default ordersReducer;
