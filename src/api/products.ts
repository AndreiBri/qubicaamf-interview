import type { Product } from "../types/Product";

// GET Product list
export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error(`Errore nel recupero prodotti: ${res.status}`);
  }
  return res.json();
}

// GET Category List
export async function getCategories(): Promise<string[]> {
  const res = await fetch("https://fakestoreapi.com/products/categories");

  if (!res.ok) {
    throw new Error(`Errore nel recuperare categorie prodotti: ${res.status}`);
  }

  return res.json();
}

// GET Products by Category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  );

  if (!res.ok) {
    throw new Error(`Errore nel recupero prodotti per categoria: ${res.status}`);
  }

  return res.json();
}
