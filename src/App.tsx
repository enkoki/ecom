import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { getProducts } from "./lib/api";
import { loadStored, saveStored, storageKeys } from "./lib/storage";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import type { CartItem, NewProduct, Product } from "./types";

function App() {
	const [apiProducts, setApiProducts] = useState<Product[]>([]);
	const [customProducts, setCustomProducts] = useState<Product[]>(() =>
		loadStored(storageKeys.products, []),
	);
	const [cart, setCart] = useState<CartItem[]>(() =>
		loadStored(storageKeys.cart, []),
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [dark, setDark] = useState(() => loadStored(storageKeys.theme, false));

	useEffect(() => {
		let active = true;
		getProducts()
			.then((data) => active && setApiProducts(data))
			.catch(
				() =>
					active &&
					setError("Could not load products. Please try again later."),
			)
			.finally(() => active && setLoading(false));
		return () => {
			active = false;
		};
	}, []);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
		saveStored(storageKeys.theme, dark);
	}, [dark]);

	const products = [...customProducts, ...apiProducts];

	const addProduct = (values: NewProduct) => {
		const product: Product = {
			...values,
			id: Date.now(),
			isCustom: true,
			rating: { rate: 0, count: 0 },
		};
		const next = [product, ...customProducts];
		setCustomProducts(next);
		saveStored(storageKeys.products, next);
	};

	const updateCart = (updater: (current: CartItem[]) => CartItem[]) => {
		setCart((current) => {
			const next = updater(current);
			saveStored(storageKeys.cart, next);
			return next;
		});
	};

	const addToCart = (product: Product) =>
		updateCart((current) => {
			const found = current.find((item) => item.product.id === product.id);
			return found
				? current.map((item) =>
						item.product.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					)
				: [...current, { product, quantity: 1 }];
		});

	const updateQuantity = (id: number, quantity: number) =>
		updateCart((current) =>
			current.map((item) =>
				item.product.id === id
					? { ...item, quantity: Math.max(1, quantity) }
					: item,
			),
		);

	return (
		<div className="min-h-screen bg-white text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
			<Header
				cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
				dark={dark}
				onToggleTheme={() => setDark((value) => !value)}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<HomePage
							products={products}
							loading={loading}
							error={error}
							onAddToCart={addToCart}
						/>
					}
				/>
				<Route
					path="/add-product"
					element={<AddProductPage onAdd={addProduct} />}
				/>
				<Route
					path="/product/:id"
					element={
						<ProductDetailsPage
							products={products}
							loading={loading}
							onAddToCart={addToCart}
						/>
					}
				/>
				<Route
					path="/cart"
					element={
						<CartPage
							cart={cart}
							onUpdateQuantity={updateQuantity}
							onRemove={(id) =>
								updateCart((current) =>
									current.filter((item) => item.product.id !== id),
								)
							}
						/>
					}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;
