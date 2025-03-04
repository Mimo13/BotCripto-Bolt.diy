import { filterCoins } from "~/utils/filters";

export async function getFilteredCoins() {
  const coins = await fetchCoinsFromAPI(); // Replace with actual API call
  return filterCoins(coins);
}

async function fetchCoinsFromAPI() {
  // Mock API call
  return [
    { symbol: "BTC", marketCap: 500000000, supply: 21000000, developer: "0xGoodDev" },
    { symbol: "SCAMCOIN1", marketCap: 100000, supply: 1000000, developer: "0xRugPullDev1" },
    { symbol: "ETH", marketCap: 200000000, supply: 120000000, developer: "0xGoodDev" },
  ];
}
