import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error('please define mongodb uri in .env file')
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}