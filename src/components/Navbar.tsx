import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCategories } from "../api/products";

const Navbar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="category-menu"
        aria-label={isOpen ? "Chiudi menu categorie" : "Apri menu categorie"}
        className="rounded p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 sm:hidden"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      <nav
        id="category-menu"
        aria-label="Categorie prodotto"
        className={`${isOpen ? "flex" : "hidden"} w-full sm:flex sm:w-auto`}
      >
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <li>
            <Link
              to="/"
              aria-current={!activeCategory ? "page" : undefined}
              onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
                className={linkClassName(activeCategory === category)}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
