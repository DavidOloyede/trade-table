import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TradeTable from '../TradeTable';
import '@testing-library/jest-dom';

test('renders trade table with correct headers', () => {
  render(<TradeTable />);
  
  expect(screen.getByText(/Ticker/i)).toBeInTheDocument();
  expect(screen.getByText(/Price/i)).toBeInTheDocument();
  expect(screen.getByText(/Asset Class/i)).toBeInTheDocument();
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { ticker: 'ALPHA', price: 3150.67, assetClass: 'Credit' },
          { ticker: 'BETA', price: 3791.37, assetClass: 'Equities' },
        ]),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders fetched data from sampleData.json', async () => {
  render(<TradeTable />);

  await waitFor(() => expect(screen.getByText('ALPHA')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('BETA')).toBeInTheDocument());

  expect(screen.getByText('3150.67')).toBeInTheDocument();
  expect(screen.getByText('Equities')).toBeInTheDocument();
});
  