export const toOptionalFixed = (num, digits) =>
  `${Number.parseFloat(Number(num).toFixed(digits))}`;
