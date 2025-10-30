import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!

if(!MONGO_URI){
    throw new Error("Please define Mongo URI in environmental variables!");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connectDB() {
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        mongoose
            .connect(MONGO_URI)
            .then(() => mongoose.connection)
    }

    try{
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        
    }
    return cached.conn
}