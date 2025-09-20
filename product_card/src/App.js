import React from "react";
import "./App.css";

const ProductCard = ({ name, price, status }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
};

function App() {
  return (
    <div className="container">
      <h2>Products List</h2>
      <div className="products">
        <ProductCard name="Wireless Mouse" price="25.99" status="In Stock" />
        <ProductCard name="Keyboard" price="45.5" status="Out of Stock" />
        <ProductCard name="Monitor" price="199.99" status="In Stock" />
      </div>
    </div>
  );
}

export default App;
