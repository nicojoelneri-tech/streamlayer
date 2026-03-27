import { useRef, useState, useEffect } from 'react'

interface LivePreviewProps {
  src: string
  title: string
  nativeWidth?: number
  nativeHeight?: number
  className?: string
  fit?: 'width' | 'contain'
  interactive?: boolean
  cropX?: number
  cropY?: number
  cropWidth?: number
  cropHeight?: number
}

export default function LivePreview({
  src,
  title,
  nativeWidth = 1920,
  nativeHeight = 1080,
  className = '',
  fit = 'width',
  interactive = false,
  cropX,
  cropY,
  cropWidth,
  cropHeight,
}: LivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  const hasCrop = cropWidth != null && cropHeight != null
  const viewW = hasCrop ? cropWidth! : nativeWidth
  const viewH = hasCrop ? cropHeight! : nativeHeight

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateScale = () => {
      const cw = el.clientWidth
      const ch = el.clientHeight

      if (fit === 'contain' && ch > 0) {
        setScale(Math.min(cw / viewW, ch / viewH))
      } else {
        setScale(cw / viewW)
      }
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(el)
    return () => observer.disconnect()
  }, [viewW, viewH, fit])

  const offsetX = hasCrop ? -(cropX ?? 0) * scale : 0
  const offsetY = hasCrop ? -(cropY ?? 0) * scale : 0

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black ${className}`}
      style={{ aspectRatio: `${viewW}/${viewH}` }}
    >
      <iframe
        src={src}
        title={title}
        width={nativeWidth}
        height={nativeHeight}
        className={`absolute border-0 ${interactive ? '' : 'pointer-events-none'}`}
        style={{
          transformOrigin: 'top left',
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          left: 0,
          top: 0,
        }}
        loading="lazy"
      />
    </div>
  )
}
