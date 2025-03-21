import { AiOutlineDelete, AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import React from 'react';
import style from './order.module.css';

const s = style;

const Order = () => {
  const orderList = [
    { name: "Milk", price: 260 },
    { name: "Milk", price: 260 },
    { name: "Milk", price: 260 },
    { name: "Milk", price: 260 },
    { name: "Milk", price: 260 },
  ];

  return (
    <div className={s.container}>
      <div className={s.top}>
        <div className={s.orderList}> 
          <h2>Order List</h2>
          <BsFillBellFill className={s.icon} />
        </div>
        <p>id:#825556</p>
      </div>

      

      <div className={s.mid}>
      <div className={s.items}>
        <h3>items</h3>
        {orderList.map((order, index) => (
          <div className={s.list} key={index}>
            <div className={s.name}>
              <h2>{order.name}</h2>
              <div className={s.btn}>
              <AiOutlineMinusSquare className={s.icon} />
              <h2>2</h2>
              <AiOutlinePlusSquare className={s.icon} />
              </div>
            </div>
           <div className={s.delete}>
           <h3>Price:{order.price}</h3>
           <AiOutlineDelete className={s.icon} />
           </div>
          </div>
        ))}
      </div>

      </div>
        <div className={s.billingSection}>
          <div className={s.subTotal}>
            <h4>Sub Total: </h4>
            <p>RS:350</p>
          </div>
          <div className={s.subTotal}>
            <h4>Tax 5%: </h4>
            <p>RS:350</p>
          </div> <div className={s.subTotal}>
            <h4> Total: </h4>
            <p>RS:350</p>
          </div>
          <div className={s.button}>
          <button className={s.proceed}>
            proceed</button>
            <button className={s.cancel}>Cancel</button>
            </div>
        </div>
      </div>
  );
};

export default Order;
