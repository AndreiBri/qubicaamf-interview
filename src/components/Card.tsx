import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto rounded overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
      <Link
        to={`/product/${product.id}`}
        className="flex flex-col flex-1 text-inherit no-underline focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      >
        <img className="w-full h-48 object-contain bg-white" src={product.image} alt={product.title} />
        <div className="px-6 py-4 flex-1">
          <div className="font-bold text-xl mb-2 line-clamp-2">{product.title}</div>
          <p className="text-gray-700 text-base line-clamp-3">{product.description}</p>
        </div>
      </Link>
      <div className="px-6 pt-4 pb-2 mt-auto flex items-center justify-between gap-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Price: {product.price} €</span>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="rounded-full bg-gray-900 px-3 py-1 text-sm font-medium text-white hover:bg-gray-800"
        >
          Aggiungi
        </button>
      </div>
    </div>
  );
};

export default Card;
