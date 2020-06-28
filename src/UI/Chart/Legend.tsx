import React, { FC, memo } from 'react';
import { LegendContainer, LegendItem, LegendLine } from './Styles';

interface Props {
  stocks: string[];
  colors: { [key: string]: string };
}

const Legend: FC<Props> = ({ stocks, colors }) => (
  <LegendContainer>
    {stocks.map(stock => (
      <LegendItem key={stock}>
        <LegendLine style={{ backgroundColor: colors[stock] ?? 'black' }} />
        <div>{stock}</div>
      </LegendItem>
    ))}
  </LegendContainer>
);

export default memo(Legend);
