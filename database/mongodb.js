import mongoose from 'mongoose'
import { DB_URI,NODE_ENV } from '../config/env.js'
if(!DB_URI){
    throw new Error('please define the mongodb uri soin enviromment cariable insid .env.local or production');
}
const connectToDatabase=async ()=>{
    try{
await mongoose.connect(DB_URI)
console.log(`connected to the database in ${NODE_ENV} mode`)


    }catch(error){
        console.log('erro on connecting to database',error)
        process.exit({code:1})
    }
}
export default connectToDatabase