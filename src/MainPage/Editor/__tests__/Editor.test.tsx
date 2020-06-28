import React from 'react';
import { render, screen } from '@testing-library/react';
import { StocksValue } from '../../../Models';
import Editor from '..';

const mockData: StocksValue[] = [
  {
    timestamp: 1,
    index: 1,
    stocks: {
      NASDAQ: 1.2,
      CAC40: 3.5
    }
  },
  {
    timestamp: 2,
    index: 2,
    stocks: {
      NASDAQ: 3.2,
      CAC40: 5.5
    }
  },
  {
    timestamp: 3,
    index: 3,
    stocks: {
      NASDAQ: 3.4,
      CAC40: 5.5
    }
  }
];

it('Should render editor', () => {
  render(<Editor data={mockData} onEditingFinished={jest.fn()} onEditingStarted={jest.fn()} />);

  expect(screen.getAllByRole('textbox')).toHaveLength(6);
});