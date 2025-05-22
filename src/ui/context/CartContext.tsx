"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { CartItem } from "@/domain/entities/CartItem"
import type { Product } from "@/domain/entities/Product"
import type { CartUseCases } from "@/domain/usecases/CartUseCases"
import { container, DI_TOKENS } from "@/lib/di/container"

interface CartContextType {
  cartItems: CartItem[]
  total: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  const cartUseCases = container.resolve<CartUseCases>(DI_TOKENS.CART_USE_CASES)

  useEffect(() => {
    const loadCart = async () => {
      const items = await cartUseCases.getCartItems()
      setCartItems(items)
      const calculatedTotal = await cartUseCases.calculateTotal()
      setTotal(calculatedTotal)
    }

    loadCart()
  }, [cartUseCases])

  const addToCart = async (product: Product, quantity = 1) => {
    await cartUseCases.addToCart(product, quantity)
    const items = await cartUseCases.getCartItems()
    setCartItems(items)
    const calculatedTotal = await cartUseCases.calculateTotal()
    setTotal(calculatedTotal)
  }

  const removeFromCart = async (productId: string) => {
    await cartUseCases.removeFromCart(productId)
    const items = await cartUseCases.getCartItems()
    setCartItems(items)
    const calculatedTotal = await cartUseCases.calculateTotal()
    setTotal(calculatedTotal)
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    await cartUseCases.updateQuantity(productId, quantity)
    const items = await cartUseCases.getCartItems()
    setCartItems(items)
    const calculatedTotal = await cartUseCases.calculateTotal()
    setTotal(calculatedTotal)
  }

  const clearCart = async () => {
    await cartUseCases.clearCart()
    setCartItems([])
    setTotal(0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
