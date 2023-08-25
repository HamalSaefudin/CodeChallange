import {createReducer} from '@reduxjs/toolkit';
import {BaseOrdersState} from '@src/types/orders';
import {setGetOrdersCallback} from '../actions/orders';

const baseOrderReducer: BaseOrdersState = {
  getOrdersCallback: [],
};

const ordersReducer = createReducer(baseOrderReducer, builder => {
  builder.addCase(setGetOrdersCallback, (state, {payload}) => ({
    ...state,
    getOrdersCallback: payload,
  }));
});

export default ordersReducer;
