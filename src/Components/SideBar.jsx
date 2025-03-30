import React from "react";
import { AiOutlineHome, AiTwotoneSetting } from "react-icons/ai";
import style from "./home.module.css";
import  {NavLink} from 'react-router-dom'
const s = style;

const SideBar = () => {
  return (
    <div className={s.left}>
      <div className={s.box}>
        <NavLink to="/" className={s.link}>
          <AiOutlineHome className={s.icons} />
          <h3>Home</h3>
        </NavLink>
        <NavLink to="/admin" className={s.link}>
          <AiTwotoneSetting className={s.icons} />
          <h3>Setting</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
