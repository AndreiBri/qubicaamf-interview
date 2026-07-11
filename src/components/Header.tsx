import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          ShopStore
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
