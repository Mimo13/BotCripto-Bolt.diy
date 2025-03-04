import { settings } from "~/config/settings";

export function filterCoins(coins: any[]) {
  return coins.filter((coin) => {
    const isBlacklisted = settings.coinBlacklist.includes(coin.symbol);
    const isRugDev = settings.devBlacklist.includes(coin.developer);
    const meetsCriteria =
      coin.marketCap >= settings.filters.minMarketCap &&
      coin.supply <= settings.filters.maxSupply;

    return !isBlacklisted && !isRugDev && meetsCriteria;
  });
}

export function blacklistCoinAndDev(coin: any) {
  // Add the coin and its developer to the blacklist
  if (!settings.coinBlacklist.includes(coin.symbol)) {
    settings.coinBlacklist.push(coin.symbol);
  }
  if (!settings.devBlacklist.includes(coin.developer)) {
    settings.devBlacklist.push(coin.developer);
  }
}
