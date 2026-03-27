interface PayhipButtonProps {
  url: string
  className?: string
  children: React.ReactNode
}

/**
 * Botón de compra universal — soporta Payhip (overlay inline) y Hotmart (nueva pestaña).
 * Payhip requiere que payhip.js esté cargado en index.html.
 */
export default function PayhipButton({ url, className = '', children }: PayhipButtonProps) {
  const isPayhip = url.includes('payhip.com')

  if (isPayhip) {
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

  // Hotmart y cualquier otra plataforma → nueva pestaña
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}
