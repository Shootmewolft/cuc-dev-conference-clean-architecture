// Implementación simplificada de un contenedor de DI sin decoradores

// Definimos tokens para nuestras dependencias
export const DI_TOKENS = {
  CART_REPOSITORY: "CartRepository",
  PRODUCT_REPOSITORY: "ProductRepository",
  CART_USE_CASES: "CartUseCases",
}

// Clase simple para el contenedor de DI
class DIContainer {
  private services: Map<string, any> = new Map()

  register<T>(token: string, implementation: T): void {
    this.services.set(token, implementation)
  }

  resolve<T>(token: string): T {
    const service = this.services.get(token)
    if (!service) {
      throw new Error(`Service not registered for token: ${token}`)
    }
    return service
  }
}

// Creamos una instancia del contenedor
export const container = new DIContainer()

// Importamos las implementaciones
import { LocalStorageCartRepository } from "@/infrastructure/repositories/LocalStorageCartRepository"
import { MockProductRepository } from "@/infrastructure/repositories/MockProductRepository"
import { CartUseCases } from "@/domain/usecases/CartUseCases"

// Registramos las implementaciones
const cartRepository = new LocalStorageCartRepository()
const productRepository = new MockProductRepository()
const cartUseCases = new CartUseCases(cartRepository)

container.register(DI_TOKENS.CART_REPOSITORY, cartRepository)
container.register(DI_TOKENS.PRODUCT_REPOSITORY, productRepository)
container.register(DI_TOKENS.CART_USE_CASES, cartUseCases)
