import type { Product } from "@/domain/entities/Product"
import type { ProductRepository } from "@/domain/repositories/ProductRepository"

export class MockProductRepository implements ProductRepository {
  private products: Product[] = [
    {
      id: "1",
      name: "Camiseta",
      price: 19.99,
      image: "/placeholder.svg?height=100&width=100",
      description: "Camiseta de algodón de alta calidad",
    },
    {
      id: "2",
      name: "Pantalones",
      price: 39.99,
      image: "/placeholder.svg?height=100&width=100",
      description: "Pantalones vaqueros clásicos",
    },
    {
      id: "3",
      name: "Zapatillas",
      price: 59.99,
      image: "/placeholder.svg?height=100&width=100",
      description: "Zapatillas deportivas cómodas",
    },
    {
      id: "4",
      name: "Gorra",
      price: 14.99,
      image: "/placeholder.svg?height=100&width=100",
      description: "Gorra ajustable con logo",
    },
  ]

  async getProducts(): Promise<Product[]> {
    // Simulamos una llamada a API con un pequeño retraso
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.products]
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const product = this.products.find((p) => p.id === id)
    return product || null
  }
}
