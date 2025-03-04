import axios from "axios";

const BASE_URL = "https://api.binance.com";

// Verificar si las claves están configuradas
const apiKey = process.env.BINANCE_API_KEY || "";
const apiSecret = process.env.BINANCE_API_SECRET || "";

if (!apiKey || !apiSecret) {
  console.error("Error: Binance API keys are missing. Please check your .env file.");
}

export const binanceApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-MBX-APIKEY": apiKey,
  },
});

// Manejo de errores en las solicitudes
export async function getMarketData(symbol: string) {
  try {
    const response = await binanceApi.get(`/api/v3/ticker/24hr`, {
      params: { symbol },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error.response?.data || error.message);
    throw error;
  }
}

export async function getUserTokens() {
  try {
    const response = await binanceApi.get(`/api/v3/account`, {
      headers: {
        "X-MBX-APIKEY": apiKey,
      },
    });
    return response.data.balances;
  } catch (error) {
    console.error("Error fetching user tokens:", error.response?.data || error.message);
    throw error;
  }
}
