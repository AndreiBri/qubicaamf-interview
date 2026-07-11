import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "../types/Product";
import Card from "../components/Card";
import { getProducts, getProductsByCategory } from "../api/products";

const Home = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const request = category ? getProductsByCategory(category) : getProducts();

    request
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <h1 className="text-center mt-8">Caricamento....</h1>;
  }

  if (error) {
    return <p className="text-center mt-8">Errore: {error}</p>;
  }

  return (
    <section aria-label={category ? `Prodotti della categoria ${category}` : "Tutti i prodotti"}>
      <ul className="grid list-none text-center items-stretch grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto max-w-6xl p-4 mt-8">
        {products.map((product) => (
          <li key={product.id}>
            <Card product={product} />
          </li>
        ))}
      </ul>
      {products.length === 0 && <p className="text-center mt-8">Nessun prodotto trovato.</p>}
    </section>
  );
};

export default Home;
