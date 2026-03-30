// Centralized Currency Configuration
// All prices are stored in USD and converted to IQD for display

export const currencyConfig = {
  baseCurrency: "USD",
  displayCurrency: "IQD",
  // Fixed conversion rate: 1 USD = 1,310 IQD (approximate)
  conversionRate: 1310,
  // Display settings
  locale: "en-IQ",
  symbol: "IQD",
  symbolPosition: "after" as const,
  thousandsSeparator: ",",
  decimalSeparator: ".",
  decimals: 0, // IQD typically doesn't use decimals
};

/**
 * Convert amount from base currency (USD) to display currency (IQD)
 */
export function convertToDisplayCurrency(amountInUSD: number): number {
  return Math.round(amountInUSD * currencyConfig.conversionRate);
}

/**
 * Convert amount from display currency (IQD) back to base currency (USD)
 */
export function convertToBaseCurrency(amountInIQD: number): number {
  return amountInIQD / currencyConfig.conversionRate;
}

/**
 * Format a number with thousands separators
 */
function formatWithSeparators(num: number): string {
  return num
    .toFixed(currencyConfig.decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, currencyConfig.thousandsSeparator);
}

/**
 * Format price for display - converts from USD to IQD and formats
 * @param amountInUSD - Price in USD (base currency)
 * @param options - Optional formatting options
 */
export function formatPrice(
  amountInUSD: number,
  options?: {
    showSymbol?: boolean;
    compact?: boolean;
  }
): string {
  const { showSymbol = true, compact = false } = options || {};
  
  const amountInIQD = convertToDisplayCurrency(amountInUSD);
  
  let formatted: string;
  
  if (compact && amountInIQD >= 1000000) {
    // Format as millions (e.g., 1.3M)
    formatted = (amountInIQD / 1000000).toFixed(1) + "M";
  } else if (compact && amountInIQD >= 1000) {
    // Format as thousands (e.g., 131K)
    formatted = (amountInIQD / 1000).toFixed(0) + "K";
  } else {
    formatted = formatWithSeparators(amountInIQD);
  }
  
  if (showSymbol) {
    return currencyConfig.symbolPosition === "after"
      ? `${formatted} ${currencyConfig.symbol}`
      : `${currencyConfig.symbol} ${formatted}`;
  }
  
  return formatted;
}

/**
 * Format price range (e.g., "131,000 - 262,000 IQD")
 */
export function formatPriceRange(minUSD: number, maxUSD: number): string {
  const minFormatted = formatPrice(minUSD, { showSymbol: false });
  const maxFormatted = formatPrice(maxUSD, { showSymbol: true });
  return `${minFormatted} - ${maxFormatted}`;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercent(
  originalPriceUSD: number,
  currentPriceUSD: number
): number {
  if (originalPriceUSD <= 0) return 0;
  return Math.round(((originalPriceUSD - currentPriceUSD) / originalPriceUSD) * 100);
}
