export const currencyFormat = (
  value: number | bigint,
  currencyDisplay: 'code' | 'symbol' | 'name' = 'symbol',
) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay,
  }).format(Number(value));
};
