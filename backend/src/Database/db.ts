import mongoose from "mongoose";

const connectDB = async () => {

    const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/loctracker?authSource=admin";
    const connection = await mongoose.connect(MONGO_URI)

    console.log(`MongoDB Connected: ${connection.connection.host}`)

   return mongoose.connection
}

export default connectDB