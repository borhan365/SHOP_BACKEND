import dotenv from 'dotenv';
import express from 'express';
import mongoDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import productRouter from './routes/productRouters.js'
import userRouter from './routes/userRoutes.js'
import cors from 'cors'

const app = express(); 
dotenv.config(); 
app.use(express.json());
app.use(cors())

// database connection
mongoDB();

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

// middlewrare
app.use(notFound)
app.use(errorHandler)

// Server connection
const PORT = process.env.PORT; 
app.listen(5000, console.log(`Apps Running ${process.env.NODE_ENV} on port ${PORT}`)); 