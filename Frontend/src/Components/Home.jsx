import React from "react";
import ProductList from "./ProductList";

export default function Home({ addToCart }) {
  return (
    <>
      <ProductList addToCart={addToCart} />
    </>
  );
}
