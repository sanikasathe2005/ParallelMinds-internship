
const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  const response = await fetch(
    `${API_URL}/products?select=id,title,price,category,thumbnail`
  );
  const data = await response.json();

  return data.products;
}

export async function getProductById(id: string) {
  const response = await fetch(
    `${API_URL}/products/${id}?select=id,title,price,category,description,thumbnail`
  );
  return response.json();
}
