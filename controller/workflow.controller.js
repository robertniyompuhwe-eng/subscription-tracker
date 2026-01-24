import { createRequire } from "module";
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
const remainders=[7,5,2,1]

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminder = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);
  if(renewalDate.isBefore(dayjs())){
    console.log(`Subscription ${subscriptionId}is already past renewal date.`)
    return;
  }
  for(const daysBefore of remainders){
    const remainderDate=renewalDate.subtract(daysBefore,'day')
    if(remainderDate.isAfter(dayjs())){
await sleepUntilRemainder(context,`${daysBefore} days`,remainderDate)
  }
  await triggerReminder(context,`remainder${daysBefore} days before`)

}})

const fetchSubscription = async (context, subscriptionId) => {
  return context.run("get subscription", async () => {
    const subscription = await Subscription
      .findById(subscriptionId)
      .populate("user", "name email");

    if (!subscription) return null;

    return subscription;
  });
};
const sleepUntilRemainder=async (context,label,date)=>{
  console.log(`sleeping until ${label} remainder at ${date}`)
  await context.sleepUntil(date.toDate())
}

const triggerReminder=async (context,label)=>{
  return await context.run(label,()=>{
console.log(`Triggering reminder for ${label}`)
  })
}