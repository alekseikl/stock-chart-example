export interface StocksValue {
  index: number
  timestamp: number
  stocks: {
    NASDAQ: number
    CAC40: number
  }
}

export type StockType = 'NASDAQ' | 'CAC40';
