import React from "react";
import style from "./mainscreen.module.css";

const s = style;

const MainScreen = () => {
  const products = [
    { id: 1, name: "Ring", price: 260, weight: "12 gram", quantity: 12 },
    { id: 2, name: "Chain", price: 350, weight: "20 gram", quantity: 8 },
    { id: 3, name: "Basket", price: 150, weight: "500 gram", quantity: 15 },
    { id: 4, name: "Watch", price: 1200, weight: "200 gram", quantity: 5 },
    { id: 5, name: "Bracelet", price: 180, weight: "15 gram", quantity: 10 },
    { id: 6, name: "Necklace", price: 400, weight: "50 gram", quantity: 7 },
    { id: 7, name: "Earrings", price: 220, weight: "10 gram", quantity: 20 },
    { id: 8, name: "Belt", price: 500, weight: "250 gram", quantity: 6 },
    { id: 9, name: "Sunglasses", price: 600, weight: "150 gram", quantity: 9 },
    { id: 10, name: "Wallet", price: 300, weight: "180 gram", quantity: 11 },
    { id: 10, name: "Wallet", price: 300, weight: "180 gram", quantity: 11 },
    { id: 10, name: "Wallet", price: 300, weight: "180 gram", quantity: 11 },
    { id: 10, name: "Wallet", price: 300, weight: "180 gram", quantity: 11 },
    { id: 10, name: "Wallet", price: 300, weight: "180 gram", quantity: 11 },
    { id: 10, name: "Wallet", price: 300, weight: "180 gram", quantity: 11 },
  ];

  return (
    <div className={s.container}>
      {products.map((product) => (
        <div key={product.id} className={s.product}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <button>Add to Basket</button>
        </div>
      ))}
    </div>
  );
};

export default MainScreen;
