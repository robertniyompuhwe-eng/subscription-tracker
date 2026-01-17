import { JWT_EXPIRES, JWT_SECRET } from "../config/env.js"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email }).session(session)
    if (existingUser) {
      const error = new Error("User already exists")
      error.statusCode = 409
      throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create(
      [{
        username,
        email,
       password:hashedPassword
      }],
      { session }
    )
    console.log(hashedPassword)

    const token = jwt.sign(
      { userId: newUser[0]._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    )

    await session.commitTransaction()
    session.endSession()

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user:newUser[0],
     token,
     
    })

  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    next(error)
  }
}

export const signIn= async (req,res,next)=>{
try{
const {email,password}=req.body
const user=await User.findOne({email})
if(!user){
  const error= new Error('the user is not found')
  error.statusCode=404
  throw error
}
const isPasswordValid=await bcrypt.compare(password,user.password)
if(!isPasswordValid){
  const error= new Error("the password is not valid")
  error.statusCode=401
  throw error
}
const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES})
res.status(200).send({
  success:true,
  message:"you have signed in successfully",
  data:{
    token,
   user 
  }
})
}catch(error){
next(error)
}
}
