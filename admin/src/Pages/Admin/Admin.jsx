// Admin.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar'; // Removed curly braces around Sidebar
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';

const Admin = () => {
  return (
   <div className="admin">
    <Sidebar/>
    <Routes>     
       <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/' element={<AddProduct/>}/>
       <Route path='/listProduct' element={<ListProduct/>}/>
    </Routes>
   </div>
  )
}

export default Admin;
