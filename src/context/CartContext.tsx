import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartContextValue, CartItem } from "../types/Cart";
import type { Product } from "../types/Product";

// Il "contenitore" del context. undefined finché nessun CartProvider è montato.
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Legge il carrello salvato in precedenza (localStorage salva solo stringhe, va convertito).
// Se non c'è niente salvato o il JSON è corrotto, si parte da un carrello vuoto.
function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Stato reale del carrello, inizializzato da localStorage al primo render.
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  const addToCart = (product: Product, quantity = 1) => {
    // setItems(prev => ...) invece di modificare items direttamente:
    // in React lo stato va sempre aggiornato creando un nuovo valore, mai mutando quello vecchio.
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        // Prodotto già nel carrello: ricostruisco l'array, aumentando solo la quantità di quell'item.
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      // Prodotto nuovo: copio l'array esistente e aggiungo il nuovo item in fondo.
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    // Tengo solo gli item il cui id è diverso da quello da rimuovere.
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    // Se la quantità scende sotto 1, ha senso rimuovere l'item invece di lasciarlo a 0.
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Valori derivati, ricalcolati ad ogni render a partire da items (non serve uno useState apposito).
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

  // Ogni volta che items cambia, salvo la nuova versione in localStorage.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Tutto questo diventa leggibile da qualunque componente dentro <CartProvider>.
  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Scorciatoia per leggere il context nei componenti: const { items, addToCart } = useCart();
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve essere usato dentro CartProvider");
  return ctx;
}
