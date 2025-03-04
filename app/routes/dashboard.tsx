import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { getMarketData, getUserTokens } from "~/utils/binanceApi";

export default function Dashboard() {
  const [marketData, setMarketData] = useState([]);
  const [userTokens, setUserTokens] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMarketData("BTCUSDT");
        console.log("Market Data:", data); // Log para depuración
        setMarketData(data);
        const tokens = await getUserTokens();
        console.log("User Tokens:", tokens); // Log para depuración
        setUserTokens(tokens);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Validar datos antes de mapear
  const candlestickData =
    marketData.length > 0
      ? marketData.map((data) => ({
          x: new Date(data.closeTime),
          y: [data.openPrice, data.highPrice, data.lowPrice, data.lastPrice],
        }))
      : [];

  return (
    <div className={`dashboard ${theme}`}>
      <button onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      <div>
        <h2>Market Data</h2>
        {candlestickData.length > 0 ? (
          <div style={{ width: "100%", height: "400px" }}>
            <ApexCharts
              options={{
                chart: {
                  type: "candlestick",
                  animations: {
                    enabled: true,
                    easing: "linear",
                    dynamicAnimation: {
                      speed: 1000,
                    },
                  },
                },
                theme: {
                  mode: theme,
                },
                xaxis: {
                  type: "datetime",
                },
              }}
              series={[
                {
                  name: "Candlestick Data",
                  data: candlestickData,
                },
              ]}
              type="candlestick"
              height={350}
            />
          </div>
        ) : (
          <p>Loading market data...</p>
        )}
      </div>
      <div>
        <h2>User Tokens</h2>
        <pre>{JSON.stringify(userTokens, null, 2)}</pre>
      </div>
    </div>
  );
}
