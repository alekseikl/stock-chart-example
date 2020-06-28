import { createSelector } from 'reselect';
import mapValues from 'lodash/mapValues';
import { RootState } from './Reducer';

export const loading = (state: RootState) => !!state.canceler;

export const failedToLoad = (state: RootState) => state.failedToLoad;

export const stockData = createSelector(
  (state: RootState) => state.stockValues,
  (state: RootState) => state.updatedValues,
  (values, updated) => values.map(item => ({
    ...item,
    stocks: mapValues(item.stocks, (val, key) => updated[`${key}-${item.index}`] ?? val)
  }))
);
