import { PackagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import type { NewProduct } from "../types";

type AddProductPageProps = {
	onAdd: (product: NewProduct) => void;
};

function AddProductPage({ onAdd }: AddProductPageProps) {
	const navigate = useNavigate();

	return (
		<main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
			<section className="rounded bg-violet-brand p-8 text-white lg:p-12">
				<PackagePlus size={42} strokeWidth={1.5} />
				<h1 className="mt-8 text-4xl font-semibold">Add something new.</h1>
				<p className="mt-4 max-w-sm text-violet-100">
					Create your own product and it will be saved on this device, ready to
					browse and add to the cart.
				</p>
			</section>
			<section className="rounded border border-zinc-200 p-6 dark:border-zinc-800 sm:p-10">
				<h2 className="mb-8 text-2xl font-semibold">Product details</h2>
				<AddProductForm
					onSubmit={(product) => {
						onAdd(product);
						navigate("/");
					}}
				/>
			</section>
		</main>
	);
}

export default AddProductPage;
