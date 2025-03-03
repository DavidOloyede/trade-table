import React, { useCallback, useEffect, useState } from 'react';
import './styles/TradeTable.css';
import { ResetButton } from './ResetButton';
import { Title } from './Title';
import TableWrapper from './TableWrapper';
import TableCell from './TableCell';
import { TableHeader } from './TableHeader';

export type Instruments = {
  readonly ticker: string;
  readonly price: number;
  readonly assetClass: 'Equities' | 'Macro' | 'Credit';
};

const sortData = (a: Instruments, b: Instruments) => {
  const assetClassOrder = ['Equities', 'Macro', 'Credit'];
  const orderedAssetClass =
    assetClassOrder.indexOf(a.assetClass) -
    assetClassOrder.indexOf(b.assetClass);

  if (orderedAssetClass !== 0) {
    return orderedAssetClass;
  }

  const priceOrder = b.price - a.price;

  if (priceOrder !== 0) {
    return priceOrder;
  }

  return a.ticker.localeCompare(b.ticker);
};

const TradeTable: React.FC = () => {
  const [data, setData] = useState<Instruments[]>([]);
  const [sortBy, setSortBy] = useState<keyof Instruments | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch('/sampleData.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data.sort(sortData));
      })
      .catch((error) => console.error('Error fetching sample data:', error));
  }, []);

  const handleSortByTicker = useCallback(() => {
    const order = sortBy === 'ticker' && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy('ticker');
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      return order === 'asc'
        ? a.ticker.localeCompare(b.ticker)
        : b.ticker.localeCompare(a.ticker);
    });

    setData(sortedData);
  }, [data, sortBy, sortOrder]);

  const handleSortByPrice = useCallback(() => {
    const order = sortBy === 'price' && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy('price');
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setData(sortedData);
  }, [data, sortBy, sortOrder]);

  const handleSortByAssetClass = useCallback(() => {
    const order =
      sortBy === 'assetClass' && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy('assetClass');
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      const assetOrder = { Equities: 1, Macro: 2, Credit: 3 };
      return order === 'asc'
        ? assetOrder[a.assetClass] - assetOrder[b.assetClass]
        : assetOrder[b.assetClass] - assetOrder[a.assetClass];
    });

    setData(sortedData);
  }, [data, sortBy, sortOrder]);

  const handleReset = useCallback(() => {
    setData(data.sort(sortData));
    setSortBy(null);
  }, [data]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title>Trade Table</Title>
        <ResetButton onClick={handleReset} />
      </div>
      <TableWrapper className='trade-table'>
        <thead>
          <tr>
            <TableHeader
              onClick={handleSortByTicker}
              text={'Ticker '}
              sortBy={sortBy === 'ticker' ? sortBy : null}
              sortOrder={sortOrder}
            />
            <TableHeader
              onClick={handleSortByPrice}
              sortBy={sortBy === 'price' ? sortBy : null}
              sortOrder={sortOrder}
              text={'Price '}
            />
            <TableHeader
              onClick={handleSortByAssetClass}
              sortBy={sortBy === 'assetClass' ? sortBy : null}
              sortOrder={ sortOrder}
              text={'Asset Class '}
            />
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.ticker}
              className={
                item.assetClass === 'Equities'
                  ? 'equities'
                  : item.assetClass === 'Macro'
                  ? 'macro'
                  : 'credit'
              }
            >
              <TableCell text={item.ticker} />
              <TableCell
                className={item.price > 0 ? 'price-positive' : 'price-negative'} text={item.price.toString()}
              />
              <TableCell text={item.assetClass} />
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
};

export default TradeTable;
