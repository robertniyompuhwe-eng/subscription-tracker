import { Router } from "express";
const subscriptionRouter=Router()
subscriptionRouter.get('/',(req,res)=>{res.send('get all subscription')})

subscriptionRouter.get('/:id',(req,res)=>{res.send('get subscritiption details')})

subscriptionRouter.post('/',(req,res)=>{res.send('create subscription')})

subscriptionRouter.put('/:id',(req,res)=>{res.send('upadate a subscription')})

subscriptionRouter.delete('/',(req,res)=>{res.send('delete  subscription')})

subscriptionRouter.get('/user/:id',(req,res)=>{res.send('get all user subscription')})

subscriptionRouter.put('/:id/cancel',(req,res)=>{res.send('get user subscription')})

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{res.send('get upcoming renewals')})

export default subscriptionRouter
