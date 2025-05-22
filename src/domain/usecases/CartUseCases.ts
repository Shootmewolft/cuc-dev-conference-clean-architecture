import type { CartItem } from "../entities/CartItem"
import type { Product } from "../entities/Product"
import type { CartRepository } from "../repositories/CartRepository"

export class CartUseCases {
  private repository: CartRepository

  constructor(repository: CartRepository) {
    this.repository = repository
  }

  async getCartItems(): Promise<CartItem[]> {
    return this.repository.getItems()
  }

  async addToCart(product: Product, quantity = 1): Promise<void> {
    const currentItems = await this.repository.getItems()
    const existingItemIndex = currentItems.findIndex((item) => item.product.id === product.id)

    if (existingItemIndex >= 0) {
      const updatedItems = [...currentItems]
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      }
      await this.repository.saveItems(updatedItems)
    } else {
      await this.repository.saveItems([...currentItems, { product, quantity }])
    }
  }

  async removeFromCart(productId: string): Promise<void> {
    const currentItems = await this.repository.getItems()
    const updatedItems = currentItems.filter((item) => item.product.id !== productId)
    await this.repository.saveItems(updatedItems)
  }

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.removeFromCart(productId)
      return
    }

    const currentItems = await this.repository.getItems()
    const updatedItems = currentItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    await this.repository.saveItems(updatedItems)
  }

  async clearCart(): Promise<void> {
    await this.repository.saveItems([])
  }

  async calculateTotal(): Promise<number> {
    const items = await this.repository.getItems()
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }
}
