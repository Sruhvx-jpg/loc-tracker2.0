import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {

    const MONGO_URI = process.env.MONGO_URI;
    if(!MONGO_URI) {
        throw new Error("MONGO_URI ISSUE")
    }
    //"mongodb://admin:password@localhost:27017/loctracker?authSource=admin" - local testing using docker
    const connection = await mongoose.connect(MONGO_URI)

    console.log(`MongoDB Connection host: ${connection.connection.host}`)
    console.log(`MongoDB Connection name: ${connection.connection.name}`)

   return mongoose.connection
}

export default connectDB