import arcjet from '@arcjet/node'
import { aj } from '../config/arcjet'
const arcjetMiddleware=async(req,res,next)=>{
    try{
const decision =await aj.protect(req)
if(decision.isDenied()){
    if(decision.reason.isRateLimit()){return res.status(429).send('Rate limit exceeded')}
    if(decision.reason.isBot()){return res.status(403).send('Bot detected')}

    return res.status(403).send('Access denies')
    next()
}
    }catch(error){
console.log(`arcjet Middleware error ${error}`)
next(error)
    }
}

export default arcjet
