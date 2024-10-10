import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/googlesignin/Signin";
import ProtectedRoute from "./Components/ProtectedRoute";
import Admin from "./Components/Admin";
import Cart from "./Components/Cart";
import Nav from "./utilis/Nav";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem("uid"); 
    if (uid) {
      fetch(`http://localhost:5000/api/cart/${uid}`)
        .then((response) => response.json())
        .then((data) => {
          setCart(data.items || []); 
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, []);

  const updateCartOnServer = (updatedCart) => {
    const uid = localStorage.getItem("uid");
    fetch(`http://localhost:5000/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, items: updatedCart }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart updated on server:", data);
      })
      .catch((error) => {
        console.error("Error updating cart on server:", error);
      });
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    updateCartOnServer(updatedCart);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    updateCartOnServer(updatedCart);
  };

  return (
    <div>
      <BrowserRouter>
        <NavWrapper cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={<Home addToCart={addToCart} cartCount={cart.length} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function NavWrapper({ cartCount }) {
  const location = useLocation();

  return <>{location.pathname !== "/admin" && <Nav cartCount={cartCount} />}</>;
}

export default App;
