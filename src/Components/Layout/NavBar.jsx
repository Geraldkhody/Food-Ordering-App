import React from 'react';
import style from './NavBar.module.css';
import Cart from './CartButton';


const NavBar = () => {
  return (
    <div className={style.navbar}>
        <div className={style.logo}>ReactMeals</div>
        <Cart />
    </div>
  )
}

export default NavBar;
