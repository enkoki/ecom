import { Heart, Star } from "lucide-react";
import type { MouseEvent } from "react";

type ProductCardProps = {
	name: string;
	price: number;
	image: string;
	rating: number;
	reviewCount: number;
	isInCart: boolean;
	onOpen: () => void;
	onToggleCart: () => void;
};

function ProductCard({
	name,
	price,
	image,
	rating,
	reviewCount,
	isInCart,
	onOpen,
	onToggleCart,
}: ProductCardProps) {
	const toggleCart = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onToggleCart();
	};

	return (
		<article
			className="group min-w-0 cursor-pointer"
			tabIndex={0}
			onClick={onOpen}
			onKeyDown={(event) => event.key === "Enter" && onOpen()}
		>
			<div
				className={`relative grid h-64 place-items-center overflow-hidden rounded transition-colors ${isInCart ? "bg-violet-50 ring-1 ring-violet-brand/30 dark:bg-violet-950/30" : "bg-zinc-100 dark:bg-zinc-900"}`}
			>
				<span className="absolute left-3 top-3 rounded-sm bg-violet-brand px-2 py-1 text-[11px] text-white">
					{isInCart ? "Added To Cart" : "-10%"}
				</span>
				<span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white text-black">
					<Heart size={17} />
				</span>
				<img
					className="h-3/4 w-3/4 object-contain transition duration-300 group-hover:scale-105"
					src={image}
					alt={name}
				/>
				<button
					className={`absolute inset-x-0 bottom-0 translate-y-full py-3 text-sm font-semibold text-white opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-md:translate-y-0 max-md:opacity-100 ${isInCart ? "bg-violet-brand hover:bg-violet-deep" : "bg-black"}`}
					type="button"
					onClick={toggleCart}
				>
					{isInCart ? "Remove From Cart" : "Add To Cart"}
				</button>
			</div>
			<div className="pt-3">
				<h2 className="truncate text-sm font-semibold">{name}</h2>
				<p className="mt-2 font-semibold text-violet-brand">
					${price.toFixed(2)}{" "}
					<del className="ml-2 font-normal text-zinc-400">
						${(price * 1.1).toFixed(2)}
					</del>
				</p>
				<p className="mt-1 flex items-center gap-1 text-xs text-amber-400">
					<Star size={14} fill="currentColor" /> {rating.toFixed(1)}
					<span className="text-zinc-400">({reviewCount})</span>
				</p>
			</div>
		</article>
	);
}

export default ProductCard;
