import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../Components/googlesignin/Config";
import { auth } from "../Components/googlesignin/Config";

export default function Nav({ cartCount }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between m-4 items-center">
        <h3 className="text-xl font-bold">Shopping Cart</h3>
        <div className="flex gap-3">
          <button
            className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 border-2 hover:text-blue-600 hover:bg-white"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={() => navigate("/cart")}
          >
            View Cart ({cartCount})
          </button>
          <button
            className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 border-2 hover:text-red-600 hover:bg-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
