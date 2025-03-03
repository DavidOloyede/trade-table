import React, { FC } from "react";
import { buttonStyle } from "./styles/TradeTable.style";

type ResetButtonProps = {
  readonly onClick: () => void;
};

export const ResetButton: FC<ResetButtonProps> = ({ onClick }) => {
    const resetButtonText = "Reset";
  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
    >
      {resetButtonText}
    </button>
  );
};
