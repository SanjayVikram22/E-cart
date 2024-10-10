import React, { useEffect, useState } from "react";

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [addedCount, setAddedCount] = useState(0); 

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedCount((prevCount) => prevCount + 1); 
    alert(`Added ${product.name} to cart!`); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">Price: ${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)} 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {addedCount > 0 && (
        <p className="mt-4 text-green-500">
          You have added {addedCount} product(s) to your cart.
        </p>
      )}
    </div>
  );
}
