import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
	products: Product[];
	cartProductIds: number[];
	onOpen: (id: number) => void;
	onAddToCart: (product: Product) => void;
	onRemoveFromCart: (id: number) => void;
};

function ProductList({
	products,
	cartProductIds,
	onOpen,
	onAddToCart,
	onRemoveFromCart,
}: ProductListProps) {
	if (products.length === 0) {
		return (
			<p className="py-16 text-center text-zinc-500">No products found.</p>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					name={product.title}
					price={product.price}
					image={product.image}
					rating={product.rating.rate}
					reviewCount={product.rating.count ?? 0}
					isInCart={cartProductIds.includes(product.id)}
					onOpen={() => onOpen(product.id)}
					onToggleCart={() =>
						cartProductIds.includes(product.id)
							? onRemoveFromCart(product.id)
							: onAddToCart(product)
					}
				/>
			))}
		</div>
	);
}

export default ProductList;
