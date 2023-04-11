// import { products, users } from './fakeapi.mjs';
// import { randomBytes } from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const User = mongoose.model("User");
const Product = mongoose.model("Product");

const resolvers = {

    Query: {
        users: async() => await User.find({}),
        user:async (_, { _id }) => await User.findOne({_id}),
        products:async () => await Product.find({}).populate("by","_id fname"),
        iproducts:async (_, { by }) => await Product.find({by}),
        myprofile:async (_,args,{userId})=>{
            if(!userId) throw new Error("You must be logged in")
           return await User.findOne({_id:userId})
        }
    },
    User: {
        products:async (ur) => await Product.find({by:ur._id}).populate("by","_id fname"),// users._id is also working
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({ email: userNew.email });
            if (user) {
                throw new Error("User already exists with that email");
            }
            const hashPassword = await bcrypt.hash(userNew.password, 12);
            const newUser = new User({
                ...userNew,
                password: hashPassword

            });
            return await newUser.save();

        },
        signinUser: async (_, { userSignin }) => {
            const user=await User.findOne({email:userSignin.email});
            if(!user){
                throw new Eroor("User doesn't exists with that email")
            }
            const doMatch = await bcrypt.compare(userSignin.password,user.password);
            if(!doMatch){
                throw new Error("email or password is invalid")
            }
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
            return {token}
        },
        createProduct:async(_,{addproduct},{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            const newProduct = new Product({
            ...addproduct,
            by:userId
        });

        return await newProduct.save();
        },
        deleteProduct: async (_, { id }, { userId }) => {
            if (!userId) {
                throw new Error("You must be logged in");
            }

            const product = await Product.findById(id);
            if (!product) {
                throw new Error("Product not found");
            }

            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct;
        }
    }
}

export default resolvers;