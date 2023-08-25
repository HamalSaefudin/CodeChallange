import {createReducer} from '@reduxjs/toolkit';
import {BaseAuthState} from '@src/types/auth';
import {setLoginCallback, setUsername} from '../actions/auth';

const baseAuthReducer: BaseAuthState = {
  username: '',
  loginCallback: '',
};

const authReducer = createReducer(baseAuthReducer, builder => {
  builder.addCase(setUsername, (state, {payload}) => ({
    ...state,
    username: payload,
  }));
  builder.addCase(setLoginCallback, (state, {payload}) => ({
    ...state,
    loginCallback: payload,
  }));
});

export default authReducer;
