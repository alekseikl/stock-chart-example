import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

it('Should handle focus/change/blur events', () => {
  const onEditingFinished = jest.fn();
  const onEditingStarted = jest.fn();

  render(
    <ValueCell 
      stock="NASDAQ" 
      index={1} 
      value={2.5} 
      onEditingFinished={onEditingFinished} 
      onEditingStarted={onEditingStarted} 
    />
  );

  fireEvent.focus(screen.getByRole('textbox'));
  expect(onEditingStarted).toBeCalled();

  fireEvent.change(screen.getByRole('textbox'), { target: { value: '3.4' } });
  expect(screen.getByRole('textbox').getAttribute('value')).toBe('3.4');
  
  fireEvent.blur(screen.getByRole('textbox'));
  expect(onEditingFinished).toBeCalledWith('NASDAQ', 1, 3.4);
});

it('Should handle key events', async () => {
  render(
    <ValueCell 
      stock="NASDAQ" 
      index={1} 
      value={2.5} 
      onEditingFinished={jest.fn()} 
      onEditingStarted={jest.fn()} 
    />
  );

  const input = screen.getByRole('textbox');
  const onBlurCall = jest.spyOn(input, 'blur');

  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: '3.4' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(input).toHaveValue('3.4');
  expect(onBlurCall).toBeCalled();

  onBlurCall.mockClear();
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: '3.4' } });
  fireEvent.keyDown(input, { key: 'Escape' });
  expect(input).toHaveValue('2.50');
  expect(onBlurCall).toBeCalled();
});