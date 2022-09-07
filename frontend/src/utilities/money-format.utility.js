
export const numberFormat = (value, fmt='ru-RU', iso4217_code='RUB') =>
  new Intl.NumberFormat(fmt, {
    style: 'currency',
    currency: iso4217_code
  }).format(value);