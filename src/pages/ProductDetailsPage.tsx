import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../types";

type ProductDetailsPageProps = {
	products: Product[];
	loading: boolean;
	cartProductIds: number[];
	onAddToCart: (product: Product) => void;
	onRemoveFromCart: (id: number) => void;
};

function ProductDetailsPage({
	products,
	loading,
	cartProductIds,
	onAddToCart,
	onRemoveFromCart,
}: ProductDetailsPageProps) {
	const { id } = useParams();
	const product = products.find((item) => item.id === Number(id));
	const isInCart = product ? cartProductIds.includes(product.id) : false;

	if (loading)
		return (
			<main className="mx-auto max-w-7xl px-5 py-20 text-center">
				Loading product...
			</main>
		);
	if (!product)
		return (
			<main className="mx-auto max-w-7xl px-5 py-20 text-center">
				<h1 className="text-3xl font-semibold">Product not found</h1>
				<Link className="mt-5 inline-block text-violet-brand" to="/">
					Back to shop
				</Link>
			</main>
		);

	return (
		<main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
			<Link
				className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-violet-brand"
				to="/"
			>
				<ArrowLeft size={17} /> Back to products
			</Link>
			<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
				<div className="grid min-h-107.5 place-items-center rounded bg-zinc-100 p-10 dark:bg-zinc-900">
					<img
						className="max-h-96 w-full object-contain"
						src={product.image}
						alt={product.title}
					/>
				</div>
				<section>
					<p className="text-sm font-semibold capitalize text-violet-brand">
						{product.category}
					</p>
					<h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
						{product.title}
					</h1>
					<p className="mt-5 flex items-center gap-2 text-sm text-amber-400">
						<Star size={17} fill="currentColor" />{" "}
						{product.rating.rate.toFixed(1)}{" "}
						<span className="text-zinc-400">
							({product.rating.count ?? 0} reviews)
						</span>
					</p>
					<p className="mt-6 text-3xl font-medium">
						${product.price.toFixed(2)}
					</p>
					<p className="mt-6 leading-7 text-zinc-600 dark:text-zinc-300">
						{product.description || "A newly added Vexora product."}
					</p>
					<button
						className={`mt-8 flex h-12 items-center gap-2 rounded-sm px-7 font-semibold text-white transition ${isInCart ? "bg-zinc-800 hover:bg-red-600" : "bg-violet-brand hover:bg-violet-deep"}`}
						type="button"
						onClick={() =>
							isInCart
								? onRemoveFromCart(product.id)
								: onAddToCart(product)
						}
					>
						<ShoppingCart size={19} />
						{isInCart ? "Remove From Cart" : "Add To Cart"}
					</button>
				</section>
			</div>
		</main>
	);
}

export default ProductDetailsPage;
