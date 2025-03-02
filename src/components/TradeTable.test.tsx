import React from "react";
import { render, screen } from "@testing-library/react";
import TradeTable from "./TradeTable";
import "@testing-library/jest-dom";

test("renders trade table with correct headers", () => {
  render(<TradeTable />);
  
  expect(screen.getByText(/Ticker/i)).toBeInTheDocument();
  expect(screen.getByText(/Price/i)).toBeInTheDocument();
  expect(screen.getByText(/Asset Class/i)).toBeInTheDocument();
});
