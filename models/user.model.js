import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:{
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
        match:[/\s+@\s+\.\s+/,'you have entered invalid email']  
    },
    passward:{
        type:String,
        require:[true,"the passward is required"],
        minlength:6

    }
},{timestamps:true})

const  User=mongoose.model('u ser',userSchema)
export default User