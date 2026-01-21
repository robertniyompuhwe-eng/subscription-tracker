import {createRequire} from 'module'
import { useContext } from 'react'
import { isContext } from 'vm'
import Subscription from '../models/subscription.model'
const require=createRequire(import.meta.url)
const {serve}=require('@upstash/workflow/express')
export const sendReminder=serve(async(useContext)=>{
    const {subscriptionId}=isContext.requestPayload;
    const subscription=await fetchSubscription(useContext,subscriptionId)
    if(!subscription|| subscription.status!=active) return
    const renewalDate=new Date(subscription.renewalDate)
})

const fetchSubscription=async (isContext,subscriptionId)=>{
    return await isContext.run('get subscription0',()=>{
        return Subscription.findById(subscriptionId).populate('User','name email')
    })
}