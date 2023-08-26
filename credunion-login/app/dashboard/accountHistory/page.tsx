'use client'
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const apiKey: string | undefined = process.env.REACT_APP_COVALENT_API_KEY;
const chainName: string = 'eth-mainnet';
const colors: string[] = ["#F44336", "#673AB7", "#03A9F4", /* ... and so on ... */];

interface HoldingItem {
  timestamp: string;
  close: {
    quote: number;
  };
}

interface TokenData {
  contract_ticker_symbol: string;
  holdings: HoldingItem[];
}

function Portfolio() {
  const [data, setData] = useState<TokenData[] | null>(null);
  const [keys, setKeys] = useState<string[] | null>(null);
  const [WalletAddress, setWalletAddress] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  const handleButtonClick = () => {
    const walletAddress = WalletAddress;
    const historicPortfolioValueEndpoint = `https://api.covalenthq.com/v1/${chainName}/address/${walletAddress}/portfolio_v2/`;

    fetch(historicPortfolioValueEndpoint, {
      method: 'GET',
      headers: {
        "Authorization": `Basic ${btoa('cqt_rQrgBRg6dRtFtVWQ8QwKMW9tkJG3' + ':')}`
      }
    })
    .then(res => res.json())
    .then(res => {
      const rawData: TokenData[] = res.data.items;
      const transformedData = transformForRecharts(rawData);
      const dataKeys = rawData.map(item => item.contract_ticker_symbol);
      setKeys(dataKeys);
      setData(transformedData);
    });
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="App">
        <h1>Enter wallet address</h1>
        <input
          type="text"
          placeholder=""
          value={WalletAddress}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Submit</button>
      </div>

      {data === null ? <>no address provided</> :
        <LineChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys?.map((item, i) => (
            <Line key={item} dataKey={item} type="monotone" stroke={colors[i]} />
          ))}
        </LineChart>
      }
    </>
  );
}

export default Portfolio;

const transformForRecharts = (rawData: TokenData[]): any[] => {
    const transformedData = rawData.reduce((acc: any[], curr: TokenData) => {
      const singleTokenTimeSeries = curr.holdings.map((holdingsItem: HoldingItem) => {
        const dateStr = holdingsItem.timestamp.slice(0, 10);
        const date = new Date(dateStr);
        
        // Omitting the options parameter to use the default formatting
        const formattedDate = date.toLocaleDateString("en-US");
        
        return {
          timestamp: formattedDate,
          [curr.contract_ticker_symbol]: holdingsItem.close.quote,
        };
      });
      const newArr = singleTokenTimeSeries.map((item, i) => Object.assign(item, acc[i]));
      return newArr;
    }, []);
  
    return transformedData;
  }
  
