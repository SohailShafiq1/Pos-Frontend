import { AiTwotoneSetting } from "react-icons/ai"; 
import { AiOutlineHome } from "react-icons/ai"; 
import React from 'react'
import NavBar from './NavBar.jsx/NavBar'
import style from './home.module.css'
import MainScreen from "./Main Screen/MainScreen";
import Order from "./Orders/Order";
const s = style
const Home = () => {
  return (
    <div className={s.container}>
     <div className={s.left}>
       <div className={s.box}>
       <div>
        <AiOutlineHome className={s.icons} />
        <h3>Home</h3>
        </div>
        <div >
            <AiTwotoneSetting className={s.icons}/>
            <h3>Setting</h3>
        </div>
       </div>
     </div>
     <div className={s.middle}>
     <NavBar/>
     <MainScreen/>
     </div>
     <div className={s.right}>
      <Order/>
     </div>
    </div>
  )
}

export default Home
