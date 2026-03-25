import { useRef, useState, useEffect } from 'react'

interface LivePreviewProps {
  src: string
  title: string
  nativeWidth?: number
  nativeHeight?: number
  className?: string
  fit?: 'width' | 'contain'
  interactive?: boolean
}

export default function LivePreview({
  src,
  title,
  nativeWidth = 1920,
  nativeHeight = 1080,
  className = '',
  fit = 'width',
  interactive = false,
}: LivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateScale = () => {
      const cw = el.clientWidth
      const ch = el.clientHeight

      if (fit === 'contain' && ch > 0) {
        setScale(Math.min(cw / nativeWidth, ch / nativeHeight))
      } else {
        setScale(cw / nativeWidth)
      }
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(el)
    return () => observer.disconnect()
  }, [nativeWidth, nativeHeight, fit])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black ${className}`}
      style={{ aspectRatio: `${nativeWidth}/${nativeHeight}` }}
    >
      <iframe
        src={src}
        title={title}
        width={nativeWidth}
        height={nativeHeight}
        className={`absolute left-0 top-0 border-0 ${interactive ? '' : 'pointer-events-none'}`}
        style={{
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
        loading="lazy"
      />
    </div>
  )
}
