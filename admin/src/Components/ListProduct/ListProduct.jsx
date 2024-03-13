import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/getAllProducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setAllProducts(data.products); // Assuming data contains a property named 'products' which is an array of products
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch('http://localhost:4000/removeProduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });

      // After removing the product, fetch the updated list of products
      fetchProducts(); // <-- Calling fetchProducts here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allProducts.map((product, index) => (
          <div key={index} className="listproduct-format-main-listprduct">
            <img src={product.image} alt="" className="listproduct-image" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => removeProduct(product.id)} src={cross_icon} alt="" className="remove-product" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
