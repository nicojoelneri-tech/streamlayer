/**
 * Formatea un precio en centavos de USD a la moneda local del usuario.
 * Ejemplo: formatPrice(1299, 'ARS', 1240) → "$1,605.60"
 */
export function formatPrice(cents: number, currencyCode = 'USD', rate = 1): string {
  const amount = (cents / 100) * rate
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
