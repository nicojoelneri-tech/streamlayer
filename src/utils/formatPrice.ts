/**
 * Redondea un monto convertido a un número "limpio" según su magnitud.
 * Ej: 14507.98 → 14500 | 290.4 → 290 | 46.2 → 46
 */
function roundNice(amount: number): number {
  if (amount >= 10000) return Math.round(amount / 500) * 500
  if (amount >= 1000)  return Math.round(amount / 100) * 100
  if (amount >= 100)   return Math.round(amount / 10) * 10
  if (amount >= 10)    return Math.round(amount)
  return Math.round(amount * 2) / 2 // nearest 0.5
}

/**
 * Formatea un precio en centavos de USD a la moneda local del usuario.
 * USD se muestra con centavos exactos. Otras monedas se redondean a número limpio.
 */
export function formatPrice(cents: number, currencyCode = 'USD', rate = 1): string {
  const raw = (cents / 100) * rate

  if (currencyCode === 'USD') {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(raw)
  }

  const rounded = roundNice(raw)
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded)
}
