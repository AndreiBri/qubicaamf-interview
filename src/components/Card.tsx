import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="flex flex-col h-full w-full max-w-md mx-auto rounded overflow-hidden shadow-lg text-inherit no-underline transition-shadow hover:shadow-xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-900"
    >
      <img className="w-full h-48 object-contain bg-white" src={product.image} alt={product.title} />
      <div className="px-6 py-4 flex-1">
        <div className="font-bold text-xl mb-2 line-clamp-2">{product.title}</div>
        <p className="text-gray-700 text-base line-clamp-3">{product.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 mt-auto">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: {product.price} €</span>
      </div>
    </Link>
  );
};

export default Card;
