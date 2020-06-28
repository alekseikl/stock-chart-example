import React, { FC, memo, useMemo } from 'react';
import max from 'lodash/max';
import { scaleLinear, scalePoint, line as d3Line, curveLinear } from 'd3';
import { StocksValue } from '../../Models';
import { Container } from './Styles';
import YAxis from './YAxis';
import XAxis from './XAxis';
import Legend from './Legend';
import { extractStockArrays, StockValue } from '../utils';

interface Props {
  width: number;
  height: number;
  data: StocksValue[];
  colors: { [key: string]: string };
}

const XAxisHeight = 20;
const YAxisPaddings = 24;
const TopPadding = 16;
const RightPadding = 16;
const BottomPadding = 8;
const ChartInsets = 12;

const Chart: FC<Props> = ({ width: svgWidth, height: svgHeight, data, colors }) => {
  const canvasContext = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;

    context.font = 'bold 12px sans-serif';
    return context;
  }, []);

  const height = svgHeight - XAxisHeight - TopPadding - BottomPadding;
  const yTicks = Math.round(height / 30);

  const yScale = useMemo(() => {
    const maxValues = data.map(item => Math.max(...Object.values(item.stocks)));
    const maxValue = max(maxValues);
  
    if (!maxValue) {
      return null;
    }
    return scaleLinear().domain([0, maxValue]).range([0, height]).nice(yTicks);
  }, [data, height, yTicks]);

  const yAxisWidth = useMemo(() => {
    if (!yScale) {
      return 0;
    }

    return (max(
      yScale.ticks(yTicks)
        .map(value => canvasContext.measureText(value.toString()).width)
      ) ?? 0) + YAxisPaddings;
  }, [canvasContext, yScale, yTicks]);

  const width = svgWidth - yAxisWidth - RightPadding;

  const xScale = useMemo(() => {
    const indexes = data.map(item => item.index);

    return scalePoint<number>().domain(indexes).range([ChartInsets, width - 2 * ChartInsets]);    
  }, [data, width]);

  const lines = useMemo(() => {
    if (!xScale || !yScale) {
      return [];
    }

    const lineByStock = extractStockArrays(data);

    return Object.entries(lineByStock).map(([key, lineData]) => ({
      stock: key,
      path: d3Line<StockValue>()
        .x(d => Math.round(xScale(d.index) ?? 0))
        .y(d => Math.round(height - yScale(d.value)))
        .curve(curveLinear)(lineData) ?? ''
    }));
  }, [data, height, xScale, yScale]);

  const stockKeys = useMemo(() => lines.map(line => line.stock), [lines]);

  if (!xScale || !yScale) {
    return null;
  }

  return (
    <Container style={{ width: svgWidth }}>
      <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(0, ${TopPadding})`}>
          <YAxis 
            width={width} 
            height={height} 
            legendWidth={yAxisWidth} 
            gridColor="#DEDEDE" 
            ticksCount={yTicks}
            scale={yScale} 
          />
          <XAxis 
            transform={`translate(${yAxisWidth}, ${height + XAxisHeight})`} 
            scale={xScale}
          />
          <g transform={`translate(${yAxisWidth}, 0)`}>
            {lines.map(({ stock, path }) => (
              <path key={stock} fill="none" strokeWidth={3} stroke={colors[stock] ?? 'red'} strokeLinecap="round" d={path} />
            ))}
          </g>
        </g>
      </svg>
      <Legend stocks={stockKeys} colors={colors} />
    </Container>
  );
};

export default memo(Chart);