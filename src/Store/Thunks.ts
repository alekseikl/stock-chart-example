import { Dispatch } from "redux";
import axios from 'axios';
import { RootState } from "./Reducer";
import * as actions from './Actions';
import { StocksValue } from "../Models";

const Api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});

const DataLength = 20;

export const fetchStockData = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();

  // Previous request in progress
  if (state.canceler) {
    return;
  }

  const cancel = axios.CancelToken.source();

  dispatch(actions.loadStockData.request(cancel.cancel));

  try {
    const response = await Api.get<StocksValue[]>('/', {
      params: { count: DataLength }
    });
    dispatch(actions.loadStockData.success(response.data.slice(0, DataLength)));
  } catch (error) {
    dispatch(actions.loadStockData.failure(axios.isCancel(error)));
  }
};

export const cancelStockDataFetch = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const state = getState();

  if (state.canceler) {
    state.canceler();
    dispatch(actions.loadStockData.failure(true));
  }
};