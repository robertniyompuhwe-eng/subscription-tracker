import { Router } from "express";
import { authorize } from "../milddleware/auth.middleware.js";
import { createSubscription,getUserSubscription } from "../controller/subscription.controller.js";
const subscriptionRouter=Router()
subscriptionRouter.get('/',(req,res)=>{res.send('get all subscriptions')})

subscriptionRouter.get('/:id',authorize,getUserSubscription)

subscriptionRouter.post('/',authorize,createSubscription)

subscriptionRouter.put('/:id',(req,res)=>{res.send('upadate a subscription')})

subscriptionRouter.delete('/',(req,res)=>{res.send('delete  subscription')})

subscriptionRouter.get('/user/:id',(req,res)=>{res.send('get all user subscription')})

subscriptionRouter.put('/:id/cancel',(req,res)=>{res.send('cancel subscription')})

subscriptionRouter.get('/upcoming-renewals',(req,res)=>{res.send('get upcoming renewals')})

export default subscriptionRouter
    