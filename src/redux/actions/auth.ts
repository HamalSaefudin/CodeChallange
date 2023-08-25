import {createAction} from '@reduxjs/toolkit';
import {
  POST_LOGIN,
  SET_LOGIN_CALLBACK,
  SET_USERNAME,
} from '@src/constants/actionList';
import {LoginCallback, PostLoginInterface} from '@src/types/auth';

export const postLogin = createAction<PostLoginInterface>(POST_LOGIN);
export const setUsername = createAction<string>(SET_USERNAME);
export const setLoginCallback = createAction<LoginCallback | string>(
  SET_LOGIN_CALLBACK,
);
