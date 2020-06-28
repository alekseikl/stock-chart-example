import React, { FC, useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../Store/Selectors';
import { fetchStockData } from '../Store/Thunks';
import useResizeAware from 'react-resize-aware';
import { Container, StockColors, ChartContainer } from './Styles';
import Chart from './Chart';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const [resizeListener, sizes] = useResizeAware();
  const [updatesEnabled] = useState(true);
  const stockData = useSelector(selectors.stockData);
  const loading = useSelector(selectors.loading);
  const failedToLoad = useSelector(selectors.failedToLoad);

  useEffect(() => {
    dispatch(fetchStockData());
  }, [dispatch]);

  useEffect(() => {
    if (!updatesEnabled) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      dispatch(fetchStockData());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, updatesEnabled]);

  if (stockData.length) {
    return (
      <Container>
        <ChartContainer>
          {resizeListener}
          {sizes.width > 0 && (
            <Chart width={sizes.width} height={300} data={stockData} colors={StockColors} />
          )}
        </ChartContainer>
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
