export function analyzePatterns(accountCoins: any[], migratedTokens: any[]) {
  const patterns = {
    commonCoins: [],
    blacklistedCoins: [],
    significantMarketCapChanges: [],
  };

  const migratedSymbols = new Set(migratedTokens.map((token) => token.symbol));

  accountCoins.forEach((coin) => {
    if (migratedSymbols.has(coin.symbol)) {
      patterns.commonCoins.push(coin);
    }

    if (coin.marketCap > 100000000) {
      patterns.significantMarketCapChanges.push(coin);
    }
  });

  return patterns;
}
