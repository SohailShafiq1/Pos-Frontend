import React from 'react'
import style from './setting.module.css'
import AddingProducts from './Adding Products/AddingProducts'
const s = style
const Setting = () => {
  return (
    <div className={s.container}>
      <div className={s.elements }>
        <AddingProducts/>
         </div>
      <div className={s.elements }> </div>
      <div className={s.elements }> </div>
      <div className={s.elements }> </div>
    </div>
  )
}

export default Setting
