import { createAsyncAction, createAction } from 'typesafe-actions';
import { Canceler } from './Types';
import { StocksValue } from '../Models';

export const loadStockData = createAsyncAction(
  'load-stock-data-request',
  'load-stock-data-success',
  'load-stock-data-failure'
)<Canceler, StocksValue[], boolean>();

export const setStockValue = createAction('set-stock-value')<{ 
  stock: string;
  index: number;
  value: number;
}>();

