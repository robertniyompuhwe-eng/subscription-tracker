import { Router } from "express";
import { signUp } from "../controller/auth.controller.js";
const authRouter=Router()

authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',(req,res)=>{res.send({message:'sign in'})})
authRouter.post('/sign-out',(req,res)=>{res.send({message:'sign out'})})
export default authRouter