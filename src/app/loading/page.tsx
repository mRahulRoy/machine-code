export default async function ProductPage() {
  const res = await fetch(`https://fakestoreapi.com/products/1`);

  // ✅ check if response is okay
  if (!res.ok) {
    return <p>Product not found or failed to fetch!</p>;
  }

  // ✅ try-catch in case response is empty/invalid
  let product;
  try {
    product = await res.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return <p>Error loading product data</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}
