import type { Product } from "@/src/data/products";
import { fetchProductById as fetchProductByIdRaw } from "@/src/services/productService";

export async function fetchProductById(id: string): Promise<Product | null> {
  return await fetchProductByIdRaw(id);
}

export async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
  const results = await Promise.all(ids.map((id) => fetchProductByIdRaw(id)));
  return results.filter((product): product is Product => product !== null);
}
