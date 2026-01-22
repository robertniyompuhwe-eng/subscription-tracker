import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminder = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = new Date(subscription.renewalDate);

});

const fetchSubscription = async (context, subscriptionId) => {
  return context.run("get subscription", async () => {
    const subscription = await Subscription
      .findById(subscriptionId)
      .populate("user", "name email");

    if (!subscription) return null;

    return subscription;
  });
};


