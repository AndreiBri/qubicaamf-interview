import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import Card from "../components/Card";
import { getProducts } from "../api/products";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 className=" text-center mt-8">Caricamento....</h1>;
  }

  if (error) {
    return <p className=" text-center mt-8">Errore: {error}</p>;
  }

  return (
    <>
      <div>
        {products.map((product) => {
          return <Card key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Home;
