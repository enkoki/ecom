import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import ProductSkeleton from "../components/ProductSkeleton";
import SectionTitle from "../components/SectionTitle";
import type { Product } from "../types";

type HomePageProps = {
	products: Product[];
	loading: boolean;
	error: string;
	cartProductIds: number[];
	onAddToCart: (product: Product) => void;
	onRemoveFromCart: (id: number) => void;
};

function HomePage({
	products,
	loading,
	error,
	cartProductIds,
	onAddToCart,
	onRemoveFromCart,
}: HomePageProps) {
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("default");
	const navigate = useNavigate();

	const visibleProducts = products
		.filter((product) =>
			product.title.toLowerCase().includes(search.toLowerCase()),
		)
		.sort((a, b) =>
			sort === "low"
				? a.price - b.price
				: sort === "high"
					? b.price - a.price
					: 0,
		);

	return (
		<main className="mx-auto max-w-7xl px-5 py-14 md:py-20">
			<div className="flex flex-col justify-between gap-6 border-b border-zinc-200 pb-8 dark:border-zinc-800 md:flex-row md:items-end">
				<SectionTitle eyebrow="Today's" title="Flash Sales" />
				<div className="flex flex-col gap-3 sm:flex-row">
					<label className="relative">
						<span className="sr-only">Search products</span>
						<input
							className="h-11 w-full rounded-sm border border-zinc-300 bg-transparent pl-4 pr-10 text-sm dark:border-zinc-700 sm:w-64"
							type="search"
							placeholder="What are you looking for?"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
						/>
						<Search className="absolute right-3 top-3" size={18} />
					</label>
					<select
						className="h-11 rounded-sm border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
						value={sort}
						onChange={(event) => setSort(event.target.value)}
					>
						<option value="default">Sort by</option>
						<option value="low">Price: Low to High</option>
						<option value="high">Price: High to Low</option>
					</select>
				</div>
			</div>

			<div className="pt-10">
				{loading && (
					<>
						<p className="mb-6 text-center text-sm font-medium text-zinc-500" role="status">
							Loading products...
						</p>
						<ProductSkeleton />
					</>
				)}
				{error && (
					<p className="rounded bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-200">
						{error}
					</p>
				)}
				{!loading && !error && (
					<ProductList
						products={visibleProducts}
						cartProductIds={cartProductIds}
						onOpen={(id) => navigate(`/product/${id}`)}
						onAddToCart={onAddToCart}
						onRemoveFromCart={onRemoveFromCart}
					/>
				)}
			</div>
		</main>
	);
}

export default HomePage;
