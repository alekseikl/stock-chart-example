import React, { FC, memo } from 'react';
import { ScaleLinear } from 'd3';

interface Props {
  width: number;
  height: number;
  legendWidth: number;
  gridColor: string;
  ticksCount: number;
  scale: ScaleLinear<number, number>;
}

const LabelMargin = 8;

const YAxis: FC<Props> = ({ width, height, legendWidth, gridColor, ticksCount, scale }) => {
  const ticks = scale.ticks(ticksCount);

  return (
    <g>
      {ticks.map((value, idx) => {
        const y = height - Math.round(scale(value));

        return (
          <g key={idx}>
            <line x1={legendWidth} y1={y} x2={width + legendWidth} y2={y} stroke={gridColor} strokeWidth="2px" />
            <text textAnchor="end" fill="currentColor" dy="0.32em" x={legendWidth - LabelMargin} y={y}>
              {value}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default memo(YAxis);