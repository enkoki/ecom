function ProductSkeleton() {
	return (
		<div
			className="grid animate-pulse grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
			aria-label="Loading products"
		>
			{Array.from({ length: 8 }).map((_, index) => (
				<div key={index}>
					<div className="h-64 rounded bg-zinc-200 dark:bg-zinc-800" />
					<div className="mt-3 h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
					<div className="mt-3 h-4 w-2/5 rounded bg-zinc-200 dark:bg-zinc-800" />
				</div>
			))}
		</div>
	);
}

export default ProductSkeleton;
