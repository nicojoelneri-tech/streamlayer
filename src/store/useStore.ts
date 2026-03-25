import { create } from 'zustand'

interface StoreState {
  cart: string[]

  addToCart: (packId: string) => void
  removeFromCart: (packId: string) => void
  clearCart: () => void
}

export const useStore = create<StoreState>((set) => ({
  cart: [],

  addToCart: (packId) =>
    set((state) => ({
      cart: state.cart.includes(packId) ? state.cart : [...state.cart, packId],
    })),

  removeFromCart: (packId) =>
    set((state) => ({
      cart: state.cart.filter((id) => id !== packId),
    })),

  clearCart: () => set({ cart: [] }),
}))
