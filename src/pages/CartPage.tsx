import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-2xl mx-auto p-4 mt-12 text-center">
        <p className="mb-4 dark:text-gray-200">Il carrello é vuoto.</p>
        <Link to="/" className="text-gray-700 hover:underline dark:text-gray-300">
          &larr; Torna allo shopping
        </Link>
      </section>
    );
  }
  return (
    <section className="max-w-2xl mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Il tuo carrello</h1>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.product.id} className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded shadow p-4">
            <Link to={`/product/${item.product.id}`} className="flex items-center gap-4 flex-1 min-w-0">
              <img src={item.product.image} alt={item.product.title} className="h-20 w-20 object-contain bg-white shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="font-semibold line-clamp-2 dark:text-white">{item.product.title}</p>
                <p className="text-gray-700 dark:text-gray-300">{item.product.price} €</p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                aria-label="Diminuisci quantità"
              >
                -
              </button>
              <span className="w-6 text-center dark:text-white">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                aria-label="Aumenta quantità"
              >
                +
              </button>
            </div>

            <button type="button" onClick={() => removeFromCart(item.product.id)} className="text-sm text-red-600 hover:underline dark:text-red-400">
              Rimuovi
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={clearCart} className="text-sm text-gray-500 hover:underline dark:text-gray-400">
          Svuota carrello
        </button>
        <p className="text-xl font-bold dark:text-white">Totale: {totalPrice.toFixed(2)} €</p>
      </div>
    </section>
  );
};

export default CartPage;
