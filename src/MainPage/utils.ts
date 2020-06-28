import { StocksValue } from "../Models";

export interface StockValue {
  index: number;
  value: number;
}

export const extractStockArrays = (data: StocksValue[]) => {
  const byStock: { [key: string]: StockValue[] } = {};

  data.forEach(item => {
    Object.entries(item.stocks).forEach(([key, value]) => {
      const valueData: StockValue = {
        value,
        index: item.index,
      };
      if (byStock[key]) {
        byStock[key].push(valueData);
      } else {
        byStock[key] = [valueData];
      }
    });
  });

  return byStock;
};