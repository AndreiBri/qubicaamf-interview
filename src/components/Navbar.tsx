import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCategories } from "../api/products";

interface NavbarProps {
  onNavigate?: () => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const linkClassName = (isActive: boolean) =>
    `inline-block whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium capitalize ${
      isActive
        ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav aria-label="Categorie prodotto">
      <ul className="flex flex-col gap-2 lg:flex-row lg:flex-wrap">
        <li>
          <Link
            to="/"
            aria-current={!activeCategory ? "page" : undefined}
            onClick={onNavigate}
            className={linkClassName(!activeCategory)}
          >
            Tutti
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <Link
              to={`/?category=${encodeURIComponent(category)}`}
              aria-current={activeCategory === category ? "page" : undefined}
              onClick={onNavigate}
              className={linkClassName(activeCategory === category)}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
