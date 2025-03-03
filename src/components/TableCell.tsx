import React, { FC } from 'react';
import { cellStyle } from './styles/TradeTable.style';

type TableCellProps = {
  readonly className?: string;
    readonly text: string;
};

const TableCell: FC<TableCellProps> = ({ text, className }) => {
  return (
    <td className={className} style={cellStyle}>
      {text}
    </td>
  );
};

export default TableCell;