import React, { FC, memo } from 'react';
import { ScalePoint } from 'd3';

interface Props {
  transform: string;
  scale: ScalePoint<number>;
}

const XScale: FC<Props> = ({ transform, scale }) => (
  <g transform={transform}>
    {scale.domain().map(index => (
      <text key={index} textAnchor="middle" fill="currentColor" x={scale(index)} y={0}>{index}</text>
    ))}
  </g>
);

export default memo(XScale);