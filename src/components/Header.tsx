import { Link } from "react-router-dom";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isAuthenticated, username, logout } = useAuth();
  const { totalCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white shadow dark:bg-gray-900 dark:shadow-gray-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          ShopStore
        </Link>
        <Navbar />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Attiva tema chiaro" : "Attiva tema scuro"}
            className="rounded p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
          </button>
          <Link to="/cart" aria-label="Vai al carrello" className="relative rounded p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-xs font-semibold text-white">
                {totalCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-200">Ciao, {username}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-gray-900 px-3 py-1 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
