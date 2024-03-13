import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        old_price: '',
        new_price: '',
        category: 'women',
        image: ''
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        // Handle form submission here, e.g., send data to backend
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);
        await fetch('http://localhost:4000/upload',{
            method:'Post',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then(data =>{ responseData = data});
        // Your logic for sending data to backend
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            // alert("Product added successfully");
            await fetch('http://localhost:4000/addProduct',{
                method:'Post',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{

              data.success?alert("Product added successfully"):alert("Error in adding the Product")
                
            })
        }
    };
      
    return (
            <div>
        <div className="addProduct">
            <div className="addProduct-itemfield">
                <p>Product Title</p>
                <input
                    type="text"
                    placeholder="Type here"
                    name="name"
                    value={productDetails.name}
                    onChange={changeHandler}
                />
            </div>
            <div className="addproductprice">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        type="text"
                        name="old_price"
                        placeholder="Type here"
                        value={productDetails.old_price}
                        onChange={changeHandler}
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input
                        type="text"
                        name="new_price"
                        placeholder="Type here"
                        value={productDetails.new_price}
                        onChange={changeHandler}
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Category</p>
                    <select
                        name="category"
                        className="addproduct-selector"
                        value={productDetails.category}
                        onChange={changeHandler}
                    >
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kid</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="file-input">
                        <img
                            src={image ? URL.createObjectURL(image) : upload_area}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={imageHandler}
                        type="file"
                        name="image"
                        id="file-input"
                        hidden
                    />
                </div>
                <button className="addproduct-btn" onClick={Add_Product}>
                    ADD
                </button>
            </div>
        </div>
         </div>
    );
};

export default AddProduct;
