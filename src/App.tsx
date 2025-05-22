import ProductList from "@/ui/components/ProductList"
import ShoppingCart from "@/ui/components/ShoppingCart"
import { CartProvider } from "@/ui/context/CartContext"

export default function App() {
  return (
    <CartProvider>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Demo de Carrito de Compras con Clean Architecture</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Productos</h2>
            <ProductList />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Carrito</h2>
            <ShoppingCart />
          </div>
        </div>
      </main>
    </CartProvider>
  )
}
