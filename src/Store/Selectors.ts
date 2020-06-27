import { createSelector } from 'reselect';
import { RootState } from "./Reducer";

export const loading = (state: RootState) => !!state.canceler;

export const failedToLoad = (state: RootState) => state.failedToLoad;

export const stockData = createSelector(
  (state: RootState) => state.stockValues,
  (state: RootState) => state.updatedValues,
  (values, updated) => values.map(value => ({
    ...value,
    stocks: {
      NASDAQ: updated[`NASDAQ-${value.index}`] ?? value.stocks.NASDAQ,
      CAC40: updated[`CAC40-${value.index}`] ?? value.stocks.CAC40,
    }
  }))
);