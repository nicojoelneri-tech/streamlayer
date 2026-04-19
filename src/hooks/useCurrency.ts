import { useState, useEffect } from 'react'

interface CurrencyCache {
  code: string
  rate: number
  ts: number
}

const CACHE_KEY = 'sl_currency_v1'
const CACHE_TTL = 4 * 60 * 60 * 1000 // 4 horas

export function useCurrency() {
  const [code, setCode] = useState('USD')
  const [rate, setRate] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as CurrencyCache
        if (Date.now() - parsed.ts < CACHE_TTL) {
          setCode(parsed.code)
          setRate(parsed.rate)
          setLoading(false)
          return
        }
      } catch {
        // ignore malformed cache
      }
    }

    async function detect() {
      try {
        const geoRes = await fetch('https://ipwho.is/')
        const geo = await geoRes.json()
        const detectedCode: string = geo.currency?.code || 'USD'

        let detectedRate = 1
        if (detectedCode !== 'USD') {
          const rateRes = await fetch('https://open.er-api.com/v6/latest/USD')
          const rateData = await rateRes.json()
          detectedRate = rateData.rates?.[detectedCode] ?? 1
        }

        const cache: CurrencyCache = { code: detectedCode, rate: detectedRate, ts: Date.now() }
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache))
        setCode(detectedCode)
        setRate(detectedRate)
      } catch {
        // fallback silencioso a USD
      } finally {
        setLoading(false)
      }
    }

    detect()
  }, [])

  return { code, rate, loading }
}
