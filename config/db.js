import mongoose from 'mongoose';

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default mongoDB;