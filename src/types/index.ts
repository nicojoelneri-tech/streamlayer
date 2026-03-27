export type OverlayStyle = 'minimal' | 'neon' | 'gacha' | 'retro' | 'pro' | 'hacker' | 'japanese'

export type ProductCategory = 'pack' | 'camera-frame' | 'chat-theme'

export type ModuleType =
  | 'camera'
  | 'chat'
  | 'alerts'
  | 'panels'
  | 'starting'
  | 'brb'
  | 'ending'
  | 'labels'

export interface OverlayModule {
  id: ModuleType
  name: string
  description: string
  included: boolean
}

export interface OverlayPack {
  id: string
  name: string
  category: ProductCategory
  style: OverlayStyle
  description: string
  price: number
  originalPrice?: number
  modules: ModuleType[]
  previewColors: string[]
  featured?: boolean
  tag?: string
  previewImages?: string[]
  previewUrl?: string
  previewSize?: [number, number]
  previewCrop?: [number, number, number, number] // [x, y, width, height]
}
