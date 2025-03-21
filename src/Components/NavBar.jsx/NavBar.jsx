import { BiSearchAlt } from "react-icons/bi"; 
import React from 'react'
import style from './navbar.module.css'
const s = style
const NavBar = () => {
  return (
    <div className={s.container}>
      <div className={s.shopName}>
       <h1> Shop Name</h1>

      </div>
      <div className={s.search}>
        <BiSearchAlt className={s.icon} /> 
        <input type="search" placeholder="Search Item Here " />
      </div>
    </div>
  )
}

export default NavBar
