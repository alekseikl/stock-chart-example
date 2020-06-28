import React, { FC, useEffect, memo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../Store/Selectors';
import * as actions from '../Store/Actions';
import { fetchStockData, cancelStockDataFetch } from '../Store/Thunks';
import useResizeAware from 'react-resize-aware';
import { Container, StockColors, ChartContainer } from './Styles';
import Chart from './Chart';
import Editor from './Editor';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const [resizeListener, sizes] = useResizeAware();
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const stockData = useSelector(selectors.stockData);
  const loading = useSelector(selectors.loading);
  const failedToLoad = useSelector(selectors.failedToLoad);

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  useEffect(() => {
    if (!updatesEnabled) {
      dispatch(cancelStockDataFetch());
      return;
    }

    const intervalId = setInterval(() => {
      dispatch(fetchStockData());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, updatesEnabled]);

  const handleEditingStart = useCallback(() => {
    setUpdatesEnabled(false);
  }, []);

  const handleEditingFinish = useCallback((stock: string, index: number, value: number) => {
    setUpdatesEnabled(true);

    if (!isNaN(value)) {
      dispatch(actions.setStockValue({ index, value, stock }));
    }
  }, [dispatch]);

  if (stockData.length) {
    return (
      <Container>
        <ChartContainer>
          {resizeListener}
          {sizes.width > 0 && (
            <Chart width={sizes.width} height={300} data={stockData} colors={StockColors} />
          )}
        </ChartContainer>
        <Editor data={stockData} onEditingStarted={handleEditingStart} onEditingFinished={handleEditingFinish} />
      </Container>
    );
  }

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (failedToLoad) {
    return <Container>Failed to load data</Container>;
  }

  return <Container>No data</Container>;
};

export default memo(MainPage);
