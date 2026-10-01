import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
	products: Product[];
	onOpen: (id: number) => void;
	onAddToCart: (product: Product) => void;
};

function ProductList({ products, onOpen, onAddToCart }: ProductListProps) {
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
					onOpen={() => onOpen(product.id)}
					onAddToCart={() => onAddToCart(product)}
				/>
			))}
		</div>
	);
}

export default ProductList;
