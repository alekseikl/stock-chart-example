import React, { FC, memo, useCallback, useState } from 'react';
import { Cell, ValueInput } from './Styles';

interface Props {
  stock: string;
  index: number;
  value: number;
  onEditingStarted: () => void;
  onEditingFinished: (stock: string, index: number, value: number | null) => void;
}

const ValueCell: FC<Props> = ({ stock, index, value, onEditingStarted, onEditingFinished }) => {
  const [editedValue, setEditedValue] = useState<string | null>(null);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  }, []);

  const handleFocus = useCallback(() => {
    onEditingStarted();
  }, [onEditingStarted]);

  const handleBlur = useCallback(() => {
    onEditingFinished(stock, index, editedValue !== null ? parseFloat(editedValue) : null);
    setEditedValue(null);
  }, [editedValue, index, onEditingFinished, stock]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setEditedValue(null);
        e.currentTarget.blur();
      } else if (e.key === 'Enter') {
        e.currentTarget.blur();
      }
    },
    []
  );

  return (
    <Cell>
      <ValueInput 
        value={editedValue ?? value.toFixed(2)} 
        onChange={handleChange} 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        onKeyDown={handleKeyDown}
      />
    </Cell>
  );
};

export default memo(ValueCell);