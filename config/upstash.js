
import { Client } from "@upstash/workflow";

export const flowClient = new Client({ 
  baseUrl: process.env.QSTASH_URL, 
  token: process.env.QSTASH_TOKEN 
});
