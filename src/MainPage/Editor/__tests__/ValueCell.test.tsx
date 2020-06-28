import React from 'react';
import { render, screen } from '@testing-library/react';
import ValueCell from '../ValueCell';

it('Should render ValueCell', () => {
  render(
    <ValueCell 
      stock="NASDAQ" 
      index={1} 
      value={2.5} 
      onEditingFinished={jest.fn()} 
      onEditingStarted={jest.fn()} 
    />
  );

  expect(screen.getByDisplayValue('2.50')).toBeInTheDocument();
});