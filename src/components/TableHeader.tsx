import React, { FC } from 'react';
import { Instruments } from './TradeTable';
import { headerStyle } from './styles/TradeTable.style';

type TableHeaderProps = {
  readonly onClick?: () => void;
  readonly sortBy: keyof Instruments | null;
  readonly sortOrder: 'asc' | 'desc';
  readonly text: string;
};

export const TableHeader: FC<TableHeaderProps> = ({
  onClick,
  sortBy,
  sortOrder,
  text,
}) => {
  return (
    <th onClick={onClick} style={headerStyle}>
      {text}
      {sortBy && <>{sortOrder === 'asc' ? '↑' : '↓'}</>}
    </th>
  );
};
