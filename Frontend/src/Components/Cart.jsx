import React from "react";

export default function Cart({ cart, removeFromCart, isCartEmpty }) {
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price);
    return total + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {isCartEmpty ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">
            Items in Cart: {cart.length}
          </h3>
          <ul className="bg-white p-4 rounded shadow mt-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <span>
                  {item.name} - Rs{item.price}
                </span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold">
            Total Price: Rs{totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
