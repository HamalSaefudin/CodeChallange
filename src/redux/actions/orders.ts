import {createAction} from '@reduxjs/toolkit';
import {GET_ORDERS, SET_GET_ORDERS_CALLBACK} from '@src/constants/actionList';

export const getOrders = createAction<string>(GET_ORDERS);
export const setGetOrdersCallback = createAction<any>(SET_GET_ORDERS_CALLBACK);
