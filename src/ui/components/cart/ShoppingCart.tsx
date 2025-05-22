"use client";

import { useCart } from "@/ui/context/CartContext";
import { Button } from "@/ui/components/shared/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/ui/components/shared/card";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function ShoppingCart() {
	const { cartItems, removeFromCart, updateQuantity, clearCart, total } =
		useCart();

	if (cartItems.length === 0) {
		return (
			<Card>
				<CardContent className="p-6 text-center">
					<p className="text-muted-foreground">El carrito está vacío</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="p-4 pb-0">
				<div className="flex justify-between items-center">
					<span className="text-sm text-muted-foreground">
						{cartItems.length} productos en el carrito
					</span>
					<Button
						variant="ghost"
						size="sm"
						onClick={clearCart}
						className="text-red-500 hover:text-red-700 hover:bg-red-100"
					>
						Vaciar carrito
					</Button>
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<ul className="divide-y">
					{cartItems.map((item) => (
						<li key={item.product.id} className="py-3 flex items-center gap-3">
							<div className="flex-shrink-0">
								<img
									src={item.product.image || "/placeholder.svg"}
									alt={item.product.name}
									width={50}
									height={50}
									className="rounded-md"
								/>
							</div>
							<div className="flex-grow">
								<h3 className="font-medium">{item.product.name}</h3>
								<p className="text-sm text-muted-foreground">
									${item.product.price.toFixed(2)}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8"
									onClick={() =>
										updateQuantity(item.product.id, item.quantity - 1)
									}
								>
									<Minus className="h-4 w-4" />
								</Button>
								<span className="w-8 text-center">{item.quantity}</span>
								<Button
									variant="outline"
									size="icon"
									className="h-8 w-8"
									onClick={() =>
										updateQuantity(item.product.id, item.quantity + 1)
									}
								>
									<Plus className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
									onClick={() => removeFromCart(item.product.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
				<div>
					<p className="text-sm text-muted-foreground">Total:</p>
					<p className="text-xl font-bold">${total.toFixed(2)}</p>
				</div>
				<Button>Finalizar compra</Button>
			</CardFooter>
		</Card>
	);
}
