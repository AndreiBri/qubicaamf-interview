import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          ShopStore
        </Link>
        <Navbar />
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700">Ciao, {username}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-gray-900 px-3 py-1 text-sm font-medium text-white hover:bg-gray-800"
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
