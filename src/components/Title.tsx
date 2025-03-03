import React, { FC, ReactNode } from 'react';
import { titleStyle } from './styles/TradeTable.style';

type TitleProps = {
  readonly children: ReactNode;
};

export const Title: FC<TitleProps> = ({ children }) => {
  return <h2 style={titleStyle}>{children}</h2>;
};
