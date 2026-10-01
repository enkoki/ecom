import { ArrowLeft, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem } from "../types";

type CartPageProps = {
	cart: CartItem[];
	onUpdateQuantity: (id: number, quantity: number) => void;
	onRemove: (id: number) => void;
};

function CartPage({ cart, onUpdateQuantity, onRemove }: CartPageProps) {
	const [drafts, setDrafts] = useState<Record<number, number>>(() =>
		Object.fromEntries(cart.map((item) => [item.product.id, item.quantity])),
	);
	const [coupon, setCoupon] = useState("");
	const [discount, setDiscount] = useState(0);
	const [message, setMessage] = useState("");

	const subtotal = cart.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0,
	);
	const total = subtotal * (1 - discount);

	const applyCoupon = () => {
		const valid = coupon.trim().toUpperCase() === "SAVE10";
		setDiscount(valid ? 0.1 : 0);
		setMessage(
			valid ? "Coupon applied — 10% off." : "Invalid coupon. Try SAVE10.",
		);
	};

	if (cart.length === 0) {
		return (
			<main className="mx-auto max-w-7xl px-5 py-24 text-center">
				<ShoppingBag
					className="mx-auto text-violet-brand"
					size={52}
					strokeWidth={1.4}
				/>
				<h1 className="mt-6 text-3xl font-semibold">Your cart is empty</h1>
				<Link
					className="mt-7 inline-flex items-center gap-2 rounded-sm bg-violet-brand px-6 py-3 font-semibold text-white"
					to="/"
				>
					<ArrowLeft size={18} /> Return To Shop
				</Link>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-7xl px-5 py-14 md:py-20">
			<p className="mb-10 text-sm text-zinc-500">
				<Link to="/">Home</Link> / Cart
			</p>
			<div className="hidden grid-cols-[2fr_1fr_1fr_1fr] rounded-sm px-8 py-5 text-sm shadow-[0_1px_13px_rgba(0,0,0,0.08)] md:grid">
				<span>Product</span>
				<span>Price</span>
				<span>Quantity</span>
				<span>Subtotal</span>
			</div>
			<div className="mt-5 space-y-5">
				{cart.map(({ product, quantity }) => (
					<div
						className="grid items-center gap-4 rounded-sm p-5 shadow-[0_1px_13px_rgba(0,0,0,0.08)] dark:bg-zinc-900 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-8"
						key={product.id}
					>
						<div className="relative flex min-w-0 items-center gap-4">
							<button
								className="absolute -left-2 -top-2 grid size-5 place-items-center rounded-full bg-violet-brand text-white"
								type="button"
								onClick={() => onRemove(product.id)}
								aria-label={`Remove ${product.title}`}
							>
								<X size={12} />
							</button>
							<img
								className="size-14 object-contain"
								src={product.image}
								alt=""
							/>
							<span className="truncate text-sm">{product.title}</span>
						</div>
						<span className="text-sm">${product.price.toFixed(2)}</span>
						<input
							className="h-11 w-16 rounded-sm border border-zinc-400 bg-transparent px-2 text-sm"
							aria-label={`Quantity for ${product.title}`}
							type="number"
							min="1"
							max="99"
							value={drafts[product.id] ?? quantity}
							onChange={(event) =>
								setDrafts({
									...drafts,
									[product.id]: Math.max(1, Number(event.target.value)),
								})
							}
						/>
						<strong className="text-sm">
							${(product.price * quantity).toFixed(2)}
						</strong>
					</div>
				))}
			</div>

			<div className="mt-7 flex justify-between gap-4">
				<Link
					className="rounded-sm border border-zinc-500 px-5 py-3 text-sm font-semibold"
					to="/"
				>
					Return To Shop
				</Link>
				<button
					className="rounded-sm border border-zinc-500 px-5 py-3 text-sm font-semibold"
					type="button"
					onClick={() =>
						cart.forEach((item) =>
							onUpdateQuantity(item.product.id, drafts[item.product.id] || 1),
						)
					}
				>
					Update Cart
				</button>
			</div>

			<div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_420px]">
				<section>
					<div className="flex flex-col gap-3 sm:flex-row">
						<input
							className="h-12 border border-zinc-500 bg-transparent px-4"
							value={coupon}
							onChange={(event) => setCoupon(event.target.value)}
							placeholder="Coupon Code"
						/>
						<button
							className="h-12 rounded-sm bg-violet-brand px-7 font-semibold text-white"
							type="button"
							onClick={applyCoupon}
						>
							Apply Coupon
						</button>
					</div>
					{message && <p className="mt-3 text-sm text-zinc-500">{message}</p>}
				</section>
				<section className="border border-current p-6">
					<h2 className="text-xl font-semibold">Cart Total</h2>
					<p className="flex justify-between border-b border-zinc-300 py-4 text-sm dark:border-zinc-700">
						<span>Subtotal:</span>
						<span>${subtotal.toFixed(2)}</span>
					</p>
					<p className="flex justify-between border-b border-zinc-300 py-4 text-sm dark:border-zinc-700">
						<span>Shipping:</span>
						<span>Free</span>
					</p>
					{discount > 0 && (
						<p className="flex justify-between border-b border-zinc-300 py-4 text-sm dark:border-zinc-700">
							<span>Discount:</span>
							<span>-10%</span>
						</p>
					)}
					<p className="flex justify-between py-4 text-sm">
						<span>Total:</span>
						<strong>${total.toFixed(2)}</strong>
					</p>
					<button
						className="mx-auto mt-3 block rounded-sm bg-violet-brand px-7 py-3 font-semibold text-white"
						type="button"
						onClick={() => setMessage("Checkout is ready for this demo.")}
					>
						Proceed to checkout
					</button>
				</section>
			</div>
		</main>
	);
}

export default CartPage;
