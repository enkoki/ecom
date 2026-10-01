import { Heart, Moon, ShoppingCart, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

type HeaderProps = {
	cartCount: number;
	dark: boolean;
	onToggleTheme: () => void;
};

function Header({ cartCount, dark, onToggleTheme }: HeaderProps) {
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`border-b py-1 text-sm transition ${isActive ? "border-current" : "border-transparent hover:border-current"}`;

	return (
		<>
			<div className="bg-black px-4 py-2 text-center text-xs text-white">
				Summer Sale For All Products And Free Express Delivery!
			</div>
			<header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-5 px-5">
					<Link className="text-2xl font-bold tracking-tight" to="/">
						Vexora
					</Link>
					<nav
						className="hidden items-center gap-8 md:flex"
						aria-label="Main navigation"
					>
						<NavLink className={linkClass} to="/">
							Home
						</NavLink>
						<NavLink className={linkClass} to="/add-product">
							Add Product
						</NavLink>
						<NavLink className={linkClass} to="/cart">
							Cart
						</NavLink>
					</nav>
					<div className="flex items-center gap-3">
						<Heart aria-hidden="true" size={21} strokeWidth={1.7} />
						<button
							className="grid size-9 place-items-center rounded-full bg-zinc-100 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
							type="button"
							aria-label="Toggle color theme"
							onClick={onToggleTheme}
						>
							{dark ? <Sun size={18} /> : <Moon size={18} />}
						</button>
						<Link
							className="relative"
							to="/cart"
							aria-label={`Cart with ${cartCount} items`}
						>
							<ShoppingCart size={22} strokeWidth={1.7} />
							{cartCount > 0 && (
								<span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-violet-brand text-[10px] text-white">
									{cartCount}
								</span>
							)}
						</Link>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
