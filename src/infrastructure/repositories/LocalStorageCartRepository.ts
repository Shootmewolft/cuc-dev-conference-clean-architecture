import type { CartItem } from "@/domain/entities/CartItem"
import type { CartRepository } from "@/domain/repositories/CartRepository"

export class LocalStorageCartRepository implements CartRepository {
  private readonly STORAGE_KEY = "cart_items"

  async getItems(): Promise<CartItem[]> {
    if (typeof window === "undefined") {
      return []
    }

    const storedItems = localStorage.getItem(this.STORAGE_KEY)
    return storedItems ? JSON.parse(storedItems) : []
  }

  async saveItems(items: CartItem[]): Promise<void> {
    if (typeof window === "undefined") {
      return
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items))
  }
}
