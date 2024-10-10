import React, { useEffect, useState } from "react";
import Adminnav from "../utilis/Adminnav";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    setProducts(data);
  };
  console.log(products);
  const addProduct = async (e) => {
    e.preventDefault();
    if (productName && productPrice) {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: productName, price: productPrice }),
      });
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setProductName("");
      setProductPrice("");
    }
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((product) => product.id !== parseInt(id)));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Adminnav />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

        <form
          onSubmit={addProduct}
          className="mb-6 bg-white p-4 rounded shadow"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Product Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Product
          </button>
        </form>

        <h3 className="text-xl font-semibold mb-2">Product List</h3>
        <ul className="bg-white p-4 rounded shadow">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <span>
                {product.name} - ${product.price}
              </span>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
