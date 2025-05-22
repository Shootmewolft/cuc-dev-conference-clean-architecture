"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/domain/entities/Product";
import { useCart } from "@/ui/context/CartContext";
import { Button } from "@/ui/components/shared/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/ui/components/shared/card";
import { container, DI_TOKENS } from "@/lib/di/container";
import type { ProductRepository } from "@/domain/repositories/ProductRepository";

export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const { addToCart } = useCart();

	const productRepository = container.resolve<ProductRepository>(DI_TOKENS.PRODUCT_REPOSITORY);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await productRepository.getProducts();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [productRepository]);

	if (loading) {
		return <div className="flex justify-center p-8">Cargando productos...</div>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{products.map((product) => (
				<Card key={product.id} className="overflow-hidden">
					<CardHeader className="p-4">
						<CardTitle className="text-lg">{product.name}</CardTitle>
					</CardHeader>
					<CardContent className="p-4 pt-0">
						<div className="flex justify-center mb-4">
							<img
								src={product.image || "/placeholder.svg"}
								alt={product.name}
								width={100}
								height={100}
								className="rounded-md"
							/>
						</div>
						<p className="text-sm text-muted-foreground mb-2">
							{product.description}
						</p>
						<p className="font-bold">${product.price.toFixed(2)}</p>
					</CardContent>
					<CardFooter className="p-4 pt-0">
						<Button onClick={() => addToCart(product)} className="w-full">
							Añadir al carrito
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
