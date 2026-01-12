import { Router } from "express";
const userRouter=Router()

userRouter.get('/',(req,res)=>{res.send({title:'get all users'})})

userRouter.get('/:id',(req,res)=>{res.send({title:'get a user details'})})

userRouter.post('/',(req,res)=>{res.send({title:'create new user'})})

userRouter.put('/:id',(req,res)=>{res.send({title:'update the use by id'})})

userRouter.delete('/:id',(req,res)=>{res.send({title:'delete the user'})})
export default userRouter



