import express from 'express';
import { getProducts, getProudctById } from '../controllers/productController.js';
const Router = express.Router();

Router.route('/').get(getProducts)
Router.route('/:id').get(getProudctById)


export default Router;