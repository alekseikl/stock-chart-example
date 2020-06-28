export interface StocksValue {
  index: number
  timestamp: number
  stocks: { [key: string]: number }
}

export type StockType = 'NASDAQ' | 'CAC40';
