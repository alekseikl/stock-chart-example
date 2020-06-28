import React, { FC, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockData } from './Store/Thunks';
import * as selectors from './Store/Selectors';
import Chart from './UI/Chart';

const App: FC = () =>  {
  const dispatch = useDispatch();
  const stockData = useSelector(selectors.stockData);

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  const colors = {
    NASDAQ: '#DA7E49',
    CAC40: '#5690BF'
  };

  return (
    <div>
      {stockData.length && (
        <Chart width={900} height={300} data={stockData} colors={colors} />
      )}
    </div>
  );
};

export default App;
