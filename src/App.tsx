import React, { FC } from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import MainPage from './MainPage';
import { GlobalStyle } from './GlobalStyle';

const App: FC = () =>  (
  <Provider store={store}>
    <GlobalStyle />
    <MainPage />
  </Provider>
);

export default App;
