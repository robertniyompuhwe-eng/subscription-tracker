import { Router } from "express";
import {getUsers,getUSer} from "../controller/user.controller.js"
import { authorize } from "../milddleware/auth.middleware.js";
const userRouter=Router()

userRouter.get('/',getUsers)

userRouter.get('/:id',(req,res)=>authorize,getUSer)

userRouter.post('/',(req,res)=>{res.send({title:'create new user'})})

userRouter.put('/:id',(req,res)=>{res.send({title:'update the use by id'})})

userRouter.delete('/:id',(req,res)=>{res.send({title:'delete the user'})})
export default userRouter



