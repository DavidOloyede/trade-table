import React, { useEffect, useState } from "react";
import "../styles/TradeTable.css";

type Instruments = {
   readonly ticker: string;
   readonly price: number;
   readonly assetClass: "Equities" | "Macro" | "Credit";
  }
  

const sortData = (a: Instruments, b: Instruments) => {
    const assetClassOrder = ["Equities", "Macro", "Credit"];
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

  useEffect(() => {
    fetch("/sampleData.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(sortData);

        setData(sortedData);
      })
      .catch((error) => console.error("Error fetching sample data:", error));
  }, []);


  return (
    <div>
      <h2>Trade Table</h2>
      <table className="trade-table"> 
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>Asset Class</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.ticker}
              className={
                item.assetClass === "Macro"
                ? "macro-row"
                : item.assetClass === "Equities"
                ? "equities-row"
                : "credit-row"
              } 
            >
              <td>{item.ticker}</td>
              <td
                className={item.price > 0 ? "price-positive" : "price-negative"}
              >
                {item.price}
              </td>
              <td>{item.assetClass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);

};

export default TradeTable;
