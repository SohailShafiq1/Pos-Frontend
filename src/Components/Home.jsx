import React, { useState, useEffect } from "react";
import NavBar from "./NavBar.jsx/NavBar";
import style from "./home.module.css";
import MainScreen from "./Main Screen/MainScreen";

const s = style;

const Home = () => {
  const [products, setProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products") // Ensure your backend is running
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially, show all products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Handle Search Function
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products); // Show all if empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={s.container}>
      <div className={s.middle}>
        {/* ✅ NavBar only renders once, search works */}
        <NavBar onSearch={setSearchTerm} />

        {/* ✅ Show filtered products in MainScreen */}
        <MainScreen searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;
