import { BiSearchAlt } from "react-icons/bi"; 
import React, { useState } from 'react';
import style from './navbar.module.css';

const s = style;

const NavBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);  // ✅ Update search term in App.jsx
  };

  return (
    <div className={s.container}>
      <div className={s.shopName}>
        <h1> Shop name </h1>
      </div>
      <div className={s.search}>
        <BiSearchAlt className={s.icon} /> 
        <input 
          type="search" 
          placeholder="Search Item Here" 
          value={searchTerm} 
          onChange={handleChange}  
        />
      </div>
    </div>
  );
};

export default NavBar;
