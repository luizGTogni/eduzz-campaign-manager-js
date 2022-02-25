import { IFormatMoney } from '@/interfaces/models/money';

export const formatMoney = ({ value, locales, currency, showSymbol = true, removeCents = false }: IFormatMoney) => {
  let result = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency
  }).format(Number(value) || 0);

  if (!showSymbol) {
    result = result.replace(currency, '');
  }

  if (removeCents) {
    result = result.replace(/,\d{2}$/, '');
  }

  return result.replace(currency, `${currency} `);
};

export const formatWithTextMoney = ({
  value,
  locales,
  currency,
  showSymbol = true,
  removeCents = false
}: IFormatMoney) => {
  const parts = (value ?? '').toString().split(' ');
  return parts
    .map(val =>
      val.match(/\d/gim)
        ? formatMoney({
            value: val,
            locales,
            currency,
            showSymbol,
            removeCents
          })
        : val
    )
    .join(' ');
};
