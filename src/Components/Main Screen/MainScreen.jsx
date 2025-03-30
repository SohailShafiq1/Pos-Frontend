import React, { useState, useEffect } from "react";
import style from "./mainscreen.module.css";
import {
  AiOutlineDelete,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";

const s = style;

const MainScreen = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [selectedCategory]);

  const addToBasket = (product) => {
    setOrderList((prevOrders) => {
      const existingItem = prevOrders.find((item) => item.name === product.name);
      if (existingItem) {
        return prevOrders.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevOrders, { ...product, quantity: 1 }];
      }
    });
    setTotal((prevTotal) => prevTotal + product.price);
  };

  const increaseQuantity = (index) => {
    setOrderList((prevOrders) =>
      prevOrders.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setTotal((prevTotal) => prevTotal + orderList[index].price);
  };

  const decreaseQuantity = (index) => {
    setOrderList((prevOrders) => {
      if (prevOrders[index].quantity === 1) {
        return prevOrders.filter((_, i) => i !== index);
      }
      return prevOrders.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
    setTotal((prevTotal) => prevTotal - orderList[index].price);
  };

  const removeFromBasket = (index) => {
    const removedItem = orderList[index];
    setTotal((prevTotal) => prevTotal - removedItem.price * removedItem.quantity);
    setOrderList(orderList.filter((_, i) => i !== index));
  };

  // ✅ Filter products based on searchTerm
  const filteredProducts = products.filter((product) => 
    product?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );
  
  return (
    <div className={s.mainContainer}>
      {/* Category Bar */}
      <div className={s.container1}>
        <div className={s.categoryBar}>
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? s.activeCategory : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ✅ Display filtered products */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={s.product}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToBasket(product)}>Add to Basket</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Orders Section */}
      <div className={s.container2}>
        <div className={s.top}>
          <div className={s.orderList}>
            <h2>Order List</h2>
            <BsFillBellFill className={s.icon} />
          </div>
          <p>id:#825556</p>
        </div>

        <div className={s.mid}>
          <div className={s.items}>
            <h3>Items</h3>
            {orderList.map((order, index) => (
              <div className={s.list} key={index}>
                <div className={s.name}>
                  <h2>{order.name}</h2>
                  <div className={s.btn}>
                    <AiOutlineMinusSquare className={s.icon} onClick={() => decreaseQuantity(index)} />
                    <h2>{order.quantity}</h2>
                    <AiOutlinePlusSquare className={s.icon} onClick={() => increaseQuantity(index)} />
                  </div>
                </div>
                <div className={s.delete}>
                  <h3>Price: ${order.price * order.quantity}</h3>
                  <AiOutlineDelete className={s.icon} onClick={() => removeFromBasket(index)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Section */}
        <div className={s.billingSection}>
          <div className={s.subTotal}>
            <h4>Sub Total:</h4>
            <p>RS: {total}</p>
          </div>
          <div className={s.subTotal}>
            <h4>Tax 5%:</h4>
            <p>RS: {(total * 0.05).toFixed(2)}</p>
          </div>
          <div className={s.subTotal}>
            <h4>Total:</h4>
            <p>RS: {(total * 1.05).toFixed(2)}</p>
          </div>
          <div className={s.button}>
            <button className={s.proceed}>Proceed</button>
            <button className={s.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
