import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
   username:{
        type:String,
        required:[true,'username is required'],
        trim:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'user email is required'],
        lowercase:true,
        unique:true,
        minlength:5,
        maxlength:255,
        match:[/^\S+@\S+\.\S+$/,'you  entered invalid email']  
    },
    password:{
        type:String,
        required:[true,"the password is required"],
        minlength:6

    }
},{timestamps:true})

const  User=mongoose.model('user',userSchema)
export default User