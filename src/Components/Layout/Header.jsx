import React, { Fragment } from 'react';
import NavBar from './NavBar';
import mealsImage from '../../Assest/meals.jpg';
import style from './Header.module.css';



const Header = () => {
  return (
    <Fragment>
      <NavBar />
      <div className={style['main-image']}>
        <img src={mealsImage} alt='' />
      </div>
      
    </Fragment>
  )
}

export default Header
