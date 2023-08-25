import {createReducer} from '@reduxjs/toolkit';
import {BaseSpinnerState} from '@src/types/spinner';
import {hideLoading, showLoading} from '../actions/spinner';

const baseSpinnerReducer: BaseSpinnerState = {
  visible: false,
};

const spinnerReducer = createReducer(baseSpinnerReducer, builder => {
  builder.addCase(showLoading, state => ({
    ...state,
    visible: true,
  }));
  builder.addCase(hideLoading, state => ({
    ...state,
    visible: false,
  }));
});

export default spinnerReducer;
