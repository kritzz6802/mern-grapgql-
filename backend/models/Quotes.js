import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

mongoose.model("Product",productSchema);