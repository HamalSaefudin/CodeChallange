import {createAction} from '@reduxjs/toolkit';
import {
  GET_ORDERS,
  POST_CREATE_ORDER,
  SET_CREATE_ORDER_CALLBACK,
  SET_GET_ORDERS_CALLBACK,
} from '@src/constants/actionList';
import {BaseCallbackInterface} from '@src/types/base';
import {CreateOrderInterface} from '@src/types/orders';

export const createOrder =
  createAction<CreateOrderInterface>(POST_CREATE_ORDER);
export const setCreateOrderCallback = createAction<BaseCallbackInterface>(
  SET_CREATE_ORDER_CALLBACK,
);

export const getOrders = createAction(GET_ORDERS);
export const setGetOrdersCallback = createAction<any>(SET_GET_ORDERS_CALLBACK);
