import React, { FC, memo, useMemo } from 'react';
import { StocksValue } from '../../Models';
import { Container, ValuesRow, NameCell } from './Styles';
import ValueCell from './ValueCell';

interface Props {
  data: StocksValue[];
  onEditingStarted: () => void;
  onEditingFinished: (stock: string, index: number, value: number) => void;
}

interface ValueData {
  index: number;
  value: number;
}

const Editor: FC<Props> = ({ data, onEditingStarted, onEditingFinished }) => {
  const values = useMemo(() => {
    const byStock: { [key: string]: ValueData[] } = {};

    data.forEach(item => {
      Object.entries(item.stocks).forEach(([key, value]) => {
        const valueData: ValueData = {
          value,
          index: item.index,
        };
        if (byStock[key]) {
          byStock[key].push(valueData);
        } else {
          byStock[key] = [valueData];
        }
      });
    });

    return byStock;
  }, [data]);

  return (
    <Container>
      {Object.keys(values).map(stock => (
        <ValuesRow key={stock}>
          <NameCell>{stock}</NameCell>
          {values[stock].map(value => (
            <ValueCell 
              key={value.index} 
              stock={stock} 
              index={value.index} 
              value={value.value} 
              onEditingStarted={onEditingStarted}
              onEditingFinished={onEditingFinished}
            />
          ))}
        </ValuesRow>
      ))}
    </Container>
  );
};

export default memo(Editor);
