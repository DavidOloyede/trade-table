import React, { FC, ReactNode } from 'react';

type TableWrapperProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

const TableWrapper: FC<TableWrapperProps> = ({ children, className }) => {
  return <table className={className}>{children}</table>;
};

export default TableWrapper;