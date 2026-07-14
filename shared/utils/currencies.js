// Metadata for the currencies supported by api.frankfurter.dev.
// flag:     emoji shown on the wallpaper and in the picker
// symbol:   currency symbol used when formatting amounts
// decimals: how many fraction digits to show (0 for currencies without minor units)
//
// The list is kept in sync with the /v1/currencies endpoint, but we ship it
// statically so the app still works (and the picker still renders) if the
// network request fails.

export const CURRENCIES = {
  AUD: { name: "Australian Dollar", flag: "🇦🇺", symbol: "A$", decimals: 2 },
  BRL: { name: "Brazilian Real", flag: "🇧🇷", symbol: "R$", decimals: 2 },
  CAD: { name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$", decimals: 2 },
  CHF: { name: "Swiss Franc", flag: "🇨🇭", symbol: "Fr", decimals: 2 },
  CNY: { name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥", decimals: 2 },
  CZK: { name: "Czech Koruna", flag: "🇨🇿", symbol: "Kč", decimals: 2 },
  DKK: { name: "Danish Krone", flag: "🇩🇰", symbol: "kr", decimals: 2 },
  EUR: { name: "Euro", flag: "🇪🇺", symbol: "€", decimals: 2 },
  GBP: { name: "British Pound", flag: "🇬🇧", symbol: "£", decimals: 2 },
  HKD: { name: "Hong Kong Dollar", flag: "🇭🇰", symbol: "HK$", decimals: 2 },
  HUF: { name: "Hungarian Forint", flag: "🇭🇺", symbol: "Ft", decimals: 0 },
  IDR: { name: "Indonesian Rupiah", flag: "🇮🇩", symbol: "Rp", decimals: 0 },
  ILS: { name: "Israeli New Shekel", flag: "🇮🇱", symbol: "₪", decimals: 2 },
  INR: { name: "Indian Rupee", flag: "🇮🇳", symbol: "₹", decimals: 2 },
  ISK: { name: "Icelandic Króna", flag: "🇮🇸", symbol: "kr", decimals: 0 },
  JPY: { name: "Japanese Yen", flag: "🇯🇵", symbol: "¥", decimals: 0 },
  KRW: { name: "South Korean Won", flag: "🇰🇷", symbol: "₩", decimals: 0 },
  MXN: { name: "Mexican Peso", flag: "🇲🇽", symbol: "$", decimals: 2 },
  MYR: { name: "Malaysian Ringgit", flag: "🇲🇾", symbol: "RM", decimals: 2 },
  NOK: { name: "Norwegian Krone", flag: "🇳🇴", symbol: "kr", decimals: 2 },
  NZD: { name: "New Zealand Dollar", flag: "🇳🇿", symbol: "NZ$", decimals: 2 },
  PHP: { name: "Philippine Peso", flag: "🇵🇭", symbol: "₱", decimals: 2 },
  PLN: { name: "Polish Złoty", flag: "🇵🇱", symbol: "zł", decimals: 2 },
  RON: { name: "Romanian Leu", flag: "🇷🇴", symbol: "lei", decimals: 2 },
  SEK: { name: "Swedish Krona", flag: "🇸🇪", symbol: "kr", decimals: 2 },
  SGD: { name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$", decimals: 2 },
  THB: { name: "Thai Baht", flag: "🇹🇭", symbol: "฿", decimals: 2 },
  TRY: { name: "Turkish Lira", flag: "🇹🇷", symbol: "₺", decimals: 2 },
  USD: { name: "United States Dollar", flag: "🇺🇸", symbol: "$", decimals: 2 },
  ZAR: { name: "South African Rand", flag: "🇿🇦", symbol: "R", decimals: 2 },
};

// Fallback when a code is not in the map (e.g. a new currency from the API).
export function currencyMeta(code) {
  return CURRENCIES[code] || { name: code, flag: "🏳️", symbol: "", decimals: 2 };
}

// Format an amount for a given currency code, honouring its decimal places
// and adding thousands separators.
export function formatAmount(amount, code) {
  const { decimals } = currencyMeta(code);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}
