import asyncHandaler from 'express-async-handler';
import Product from '../models/productModel.js';


// @Description      : Fetch all products
// @Route           : GET '/api/products'
// @Accesss        : Public
const getProducts = asyncHandaler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @Description     : Fetch single product data
// @Route           : GET '/api/products/:id'
// @Access          : Public
const getProudctById = asyncHandaler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404).json({ message : "Sorry! Your product can't find!"})
    }
})

export { getProducts, getProudctById }