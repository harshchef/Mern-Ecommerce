import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import addproducticon from '../../assets/Product_Cart.svg';
import lisproducticon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to='/addproduct' style={{ textDecoration: "none" }}>
        <div className="sidebaritem">
          <img src={addproducticon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to='/listProduct' style={{ textDecoration: "none" }}>
        <div className="sidebaritem">
          <img src={lisproducticon} alt="" />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
