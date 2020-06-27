import * as actions from './Actions';
import { createReducer } from 'typesafe-actions';
import { StocksValue } from '../Models';
import { Canceler } from './Types';

interface State {
  stockValues: StocksValue[];
  updatedValues: { [key: string]: number };
  failedToLoad: boolean;
  canceler: Canceler | null;
}

export type { State as RootState };

const defaultState: State = {
  stockValues: [],
  updatedValues: {},
  failedToLoad: false,
  canceler: null
};

export default createReducer(defaultState)
  .handleAction(actions.loadStockData.request, (state, { payload }) => ({
    ...state,
    canceler: payload,
    failedToLoad: false
  }))
  .handleAction(actions.loadStockData.success, (state, { payload }) => ({
    ...state,
    canceler: null,
    stockValues: payload
  }))
  .handleAction(actions.loadStockData.failure, (state, { payload }) => ({
    ...state,
    canceler: null,
    failedToLoad: !payload // Set failed if request wasn't cancelled
  }))
  .handleAction(actions.setStockValue, (state, { payload: { type, index, value } }) => ({
    ...state,
    updatedValues: {
      ...state.updatedValues,
      [`${type}-${index}`]: value
    }
  }));