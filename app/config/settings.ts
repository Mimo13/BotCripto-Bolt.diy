import dotenv from "dotenv";

dotenv.config();

export const settings = {
  filters: {
    minMarketCap: parseInt(process.env.MIN_MARKET_CAP || "1000000", 10),
    maxSupply: parseInt(process.env.MAX_SUPPLY || "1000000000", 10),
  },
  coinBlacklist: (process.env.COIN_BLACKLIST || "").split(","),
  devBlacklist: (process.env.DEV_BLACKLIST || "").split(","),
};
