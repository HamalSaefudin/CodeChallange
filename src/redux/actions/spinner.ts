import {createAction} from '@reduxjs/toolkit';
import {HIDE_LOADING, SHOW_LOADING} from '@src/constants/actionList';

export const showLoading = createAction(SHOW_LOADING);
export const hideLoading = createAction(HIDE_LOADING);
