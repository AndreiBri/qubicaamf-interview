import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import Spinner from "../components/Spinner";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-center mt-8">Errore: {error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-8">Prodotto non trovato.</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="max-w-4xl mx-auto p-4 mt-8">
      <Link to="/" className="inline-block mb-6 text-gray-700 hover:text-gray-900 hover:underline">
        &larr; Torna alla lista
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex items-center justify-center bg-white rounded shadow-lg p-6">
          <img src={product.image} alt={product.title} className="max-h-80 w-full object-contain" />
        </div>
        <div className="md:w-1/2 flex flex-col">
          <span className="inline-block self-start bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-3 capitalize">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-2xl font-semibold mb-4">{product.price} €</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="self-start bg-gray-900 text-white rounded px-6 py-2 mr-4 font-medium hover:bg-gray-800 mb-4"
          >
            {added ? "Aggiunto ✓" : "Aggiungi al carrello"}
          </button>
          <p className="text-sm text-gray-500">
            &#9733; {product.rating.rate} ({product.rating.count} recensioni)
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
