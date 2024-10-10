const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let products = [];
let userCarts = {}; 

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    price,
  };
  products.push(newProduct);
  res.json(newProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== parseInt(id));
  res.json({ message: "Product deleted" });
});


app.get("/api/cart/:uid", (req, res) => {
  const { uid } = req.params;
  const cart = userCarts[uid] || { items: [] }; 
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  const { uid, items } = req.body;
  userCarts[uid] = { items }; 
  res.json({ message: "Cart updated", items });
});

app.get("/api/carts", (req, res) => {
  res.json(userCarts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
