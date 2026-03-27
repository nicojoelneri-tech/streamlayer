interface PayhipButtonProps {
  url: string
  className?: string
  children: React.ReactNode
}

/**
 * Botón de compra de Payhip.
 * Al hacer clic abre el checkout como overlay encima de StreamLayer
 * sin redirigir al usuario a otra página.
 * Requiere que payhip.js esté cargado en index.html.
 */
export default function PayhipButton({ url, className = '', children }: PayhipButtonProps) {
  // Extrae el ID del producto de la URL (ej: https://payhip.com/b/EZQC7 → EZQC7)
  const productId = url.split('/').pop() ?? ''

  return (
    <a
      href={url}
      className={`payhip-buy-button ${className}`}
      data-product={productId}
      data-theme="none"
    >
      {children}
    </a>
  )
}
