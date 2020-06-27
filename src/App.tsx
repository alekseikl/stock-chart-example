import React, { FC, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockData } from './Store/Thunks';
import * as selectors from './Store/Selectors';

const App: FC = () =>  {
  const dispatch = useDispatch();
  const stockData = useSelector(selectors.stockData);

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <pre>
            {JSON.stringify(stockData, undefined, 2)}
          </pre>
        </a>
      </header>
    </div>
  );
};

export default App;
