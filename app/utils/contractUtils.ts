import { settings } from "~/config/settings";

export async function checkContractStatus(symbol: string): Promise<boolean> {
  // Mock API call to check if the contract is marked as "Good"
  const goodContracts = ["BTC", "ETH", "DOGE"]; // Example of good contracts
  return goodContracts.includes(symbol);
}

export function isSupplyBundled(coin: any): boolean {
  // Check if the coin supply is bundled (e.g., unusually high supply)
  return coin.supply > settings.filters.maxSupply * 10; // Example threshold
}
