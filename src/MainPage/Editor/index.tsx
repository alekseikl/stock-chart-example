import React, { FC, memo, useMemo } from 'react';
import { StocksValue } from '../../Models';
import { Container, ValuesRow, NameCell } from './Styles';
import ValueCell from './ValueCell';
import { extractStockArrays } from '../utils';

interface Props {
  data: StocksValue[];
  onEditingStarted: () => void;
  onEditingFinished: (stock: string, index: number, value: number | null) => void;
}

const Editor: FC<Props> = ({ data, onEditingStarted, onEditingFinished }) => {
  const values = useMemo(() => extractStockArrays(data), [data]);

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
