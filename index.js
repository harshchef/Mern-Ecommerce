const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');
const multer=require("multer");
const cors=require("cors");
const router = express.Router();
const bodyParser=require("body-parser");
const path=require( "path" );
const { log } = require("console");
const port=4000

app.use(express.json());
app.use(cors());
// database connection with mongodb
mongoose.connect(
  "mongodb+srv://adityakumar0718:harsh1234@cluster0.mfo7oaq.mongodb.net/Ecommerce"
);
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload=multer({storage:storage})
app.use("/images",express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:true,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
} )



// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of email field
  },
  password: {
    type: String,
    required: true,
  },
  cartData:{
    type:Object
  },
  date:{
    type:Date,
    default:Date.now,
  }

});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;


app.post("/signup", async (req, res) => {
  // Extract user details from request body
  const { name, email, password } = req.body;

  try {
    // Check if user with provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    let cart={}
    for(let i=0;i<300;i++)
    cart[i]=0;

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password,
      cartData:cart,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }

  
});





const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  
  category: {
    type: String,
    enum: ["women", "men", "kids"], // Assuming limited categories, modify as needed
    required: true,
  },
  image: {
    type: String, // Assuming image URL is stored as a string
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,

  },
  date:{
    type:Date,
    default:Date.now,
  },
  available:{
    type:Boolean,
    default:true
  }
});

//Endpoint For user 
app.post('/signup')




const Product = mongoose.model("Product", productSchema);

module.exports = Product;

app.post("/addProduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id1;
    if (products.length > 0) {
      let lastp_array = products.slice(-1);
      id1 = lastp_array[0].id+1;
    } else {
      id1 = 1;
    }
    const { id, name, category, image, new_price, old_price } = req.body;

    // Check if product with the same ID already exists
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "Product with this ID already exists" });
    }

    // Create a new product object
    const newProduct = new Product({
      id: id1,
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    console.log(newProduct);

    // Save the new product to the database
    await newProduct.save();
    console.log("saved");
    res.status(201).json({ success: true, name: req.body.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getAllProducts", async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find({});

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/removeProduct", async (req, res) => {
  try {
    const { id } = req.body;

    // Find the product by ID
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Remove the product from the database
    await Product.deleteOne({ id });

    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/",(req,res)=>{
    res.send("Express is running")
})

app.listen(port,(error)=>
{
    if(!error)
    {
        console.log( "Server is running on "+port)
    }
    else
    {
        console.log("Error: "+error)
    }
})
