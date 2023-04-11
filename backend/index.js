import { ApolloServer } from 'apollo-server';
import {
    ApolloServerPluginLandingPageGraphQLPlayground,

} from 'apollo-server-core'
import typeDefs from './schemaGql.js'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

const port = process.env.PORT || 5000

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})
mongoose.connection.on("error", (err) => {
    console.log("err connecting", err)
});

//import model
import './models/User.js'
import './models/Quotes.js'


import resolvers from './resolvers.js'

//this is middleware for authentication
const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        return { userId }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
        ]
});


server.listen({ port },()=>{
    console.log(`🚀  Server ready at ${port}`);
});