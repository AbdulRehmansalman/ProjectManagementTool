import React from 'react';
import mainPage from '../../assets/mainpagejpg.jpg';
import './navbar.css';

const home = () => {
  return (
    <div className="image">
      <img src={mainPage} loading="lazy" />
    </div>
  );
};

export default home;
